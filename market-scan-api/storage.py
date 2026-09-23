from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from sqlalchemy import DateTime, Integer, String, Text, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _database_url() -> str:
    value = os.getenv("DATABASE_URL", "").strip()
    if value:
        if value.startswith("postgres://"):
            value = "postgresql+psycopg://" + value[len("postgres://"):]
        elif value.startswith("postgresql://") and "+psycopg" not in value:
            value = "postgresql+psycopg://" + value[len("postgresql://"):]
        return value

    data_dir = Path(__file__).resolve().parent / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    return f"sqlite:///{data_dir / 'market_scan.db'}"


DATABASE_URL = _database_url()
CONNECT_ARGS = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite:") else {}
engine = create_engine(DATABASE_URL, connect_args=CONNECT_ARGS, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class ScanExecution(Base):
    __tablename__ = "scan_executions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    status: Mapped[str] = mapped_column(String(24), nullable=False, index=True)
    submitted_url: Mapped[str] = mapped_column(Text, nullable=False)
    normalized_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    brand: Mapped[str | None] = mapped_column(Text, nullable=True)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=_utcnow, index=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    elapsed_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    summary_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    market_profile_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    research_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    report_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    report_emailed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


def init_storage() -> None:
    Base.metadata.create_all(engine)


def create_execution(execution_id: str, submitted_url: str) -> None:
    init_storage()
    with SessionLocal() as session:
        session.add(
            ScanExecution(
                id=execution_id,
                status="started",
                submitted_url=submitted_url,
                started_at=_utcnow(),
            )
        )
        session.commit()


def complete_execution(
    execution_id: str,
    *,
    normalized_url: str,
    brand: str,
    elapsed_ms: int,
    summary: dict[str, Any],
    market_profile: dict[str, Any],
    research: dict[str, Any],
    report: dict[str, Any],
) -> None:
    with SessionLocal() as session:
        row = session.get(ScanExecution, execution_id)
        if not row:
            return
        row.status = "completed"
        row.normalized_url = normalized_url
        row.brand = brand
        row.completed_at = _utcnow()
        row.elapsed_ms = elapsed_ms
        row.error = None
        row.summary_json = json.dumps(summary, ensure_ascii=False)
        row.market_profile_json = json.dumps(market_profile, ensure_ascii=False)
        row.research_json = json.dumps(research, ensure_ascii=False)
        row.report_json = json.dumps(report, ensure_ascii=False)
        session.commit()


def fail_execution(
    execution_id: str,
    *,
    error: str,
    normalized_url: str | None = None,
    elapsed_ms: int | None = None,
    status: str = "failed",
) -> None:
    with SessionLocal() as session:
        row = session.get(ScanExecution, execution_id)
        if not row:
            return
        row.status = status
        row.normalized_url = normalized_url or row.normalized_url
        row.completed_at = _utcnow()
        row.elapsed_ms = elapsed_ms
        row.error = error[:4000]
        session.commit()


def mark_report_emailed(execution_id: str) -> None:
    with SessionLocal() as session:
        row = session.get(ScanExecution, execution_id)
        if not row:
            return
        row.report_emailed_at = _utcnow()
        session.commit()


def storage_health() -> dict[str, Any]:
    try:
        init_storage()
        with SessionLocal() as session:
            count = session.scalar(select(ScanExecution.id).limit(1))
        return {
            "ok": True,
            "backend": "sqlite" if DATABASE_URL.startswith("sqlite:") else "postgresql",
            "reachable": True,
        }
    except Exception as exc:
        return {
            "ok": False,
            "backend": "sqlite" if DATABASE_URL.startswith("sqlite:") else "postgresql",
            "reachable": False,
            "error": str(exc),
        }


def _serialize_execution(row: ScanExecution, *, include_report: bool = True) -> dict[str, Any]:
    payload = {
        "id": row.id,
        "status": row.status,
        "submitted_url": row.submitted_url,
        "normalized_url": row.normalized_url,
        "brand": row.brand,
        "started_at": row.started_at.isoformat() if row.started_at else None,
        "completed_at": row.completed_at.isoformat() if row.completed_at else None,
        "elapsed_ms": row.elapsed_ms,
        "error": row.error,
        "summary": json.loads(row.summary_json) if row.summary_json else None,
        "market_profile": json.loads(row.market_profile_json) if row.market_profile_json else None,
        "research": json.loads(row.research_json) if row.research_json else None,
        "report_emailed_at": row.report_emailed_at.isoformat() if row.report_emailed_at else None,
    }
    if include_report:
        payload["report"] = json.loads(row.report_json) if row.report_json else None
    return payload


def list_executions(
    limit: int = 100,
    *,
    status: str | None = None,
    domain: str | None = None,
    include_report: bool = True,
) -> list[dict[str, Any]]:
    limit = max(1, min(limit, 500))
    statement = select(ScanExecution)
    if status:
        statement = statement.where(ScanExecution.status == status)
    if domain:
        needle = f"%{domain.strip().lower()}%"
        statement = statement.where(
            ScanExecution.normalized_url.ilike(needle)
            | ScanExecution.submitted_url.ilike(needle)
        )
    statement = statement.order_by(ScanExecution.started_at.desc()).limit(limit)

    with SessionLocal() as session:
        rows = session.scalars(statement).all()

    return [_serialize_execution(row, include_report=include_report) for row in rows]


def get_execution(execution_id: str) -> dict[str, Any] | None:
    with SessionLocal() as session:
        row = session.get(ScanExecution, execution_id)
        if not row:
            return None
        return _serialize_execution(row, include_report=True)
