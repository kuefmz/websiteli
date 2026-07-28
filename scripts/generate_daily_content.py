#!/usr/bin/env python3
"""Generate one reviewable Websiteli content draft from the 30-day calendar.

The script intentionally writes into content-drafts/ rather than the live Astro
content registry. A human must review localization, facts, links, and formatting
before moving the content into src/content/blog/posts or another public surface.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
CALENDAR_PATH = ROOT / "docs" / "CONTENT_CALENDAR_2026-07-29_TO_2026-08-27.md"
DRAFTS_DIR = ROOT / "content-drafts"

ROW_RE = re.compile(
    r"^\|\s*(?P<day>\d+)\s*\|\s*(?P<date>\d{4}-\d{2}-\d{2})\s*\|"
    r"\s*(?P<task>.*?)\s*\|\s*(?P<target>.*?)\s*\|\s*(?P<format>.*?)\s*\|"
    r"\s*(?P<cta>.*?)\s*\|\s*(?P<priority>.*?)\s*\|$"
)


def parse_calendar() -> dict[str, dict[str, str]]:
    if not CALENDAR_PATH.exists():
        raise FileNotFoundError(f"Calendar not found: {CALENDAR_PATH}")

    rows: dict[str, dict[str, str]] = {}
    for line in CALENDAR_PATH.read_text(encoding="utf-8").splitlines():
        match = ROW_RE.match(line)
        if match:
            row = {key: value.strip() for key, value in match.groupdict().items()}
            rows[row["date"]] = row
    return rows


def request_openai(prompt: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    model = os.environ.get("OPENAI_MODEL", "gpt-5")
    payload = {
        "model": model,
        "instructions": (
            "You are Websiteli's careful SEO content editor. Write practical, calm, "
            "business-oriented content for Swiss small businesses. Never invent clients, "
            "testimonials, rankings, revenue impact, prices not supplied in the repository, "
            "or legal guarantees. Clearly label assumptions and placeholders. Return only "
            "the finished Markdown draft, without code fences."
        ),
        "input": prompt,
    }

    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API error {exc.code}: {detail}") from exc

    output_text = data.get("output_text")
    if output_text:
        return output_text.strip()

    fragments: list[str] = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            text = content.get("text")
            if text:
                fragments.append(text)
    if not fragments:
        raise RuntimeError("OpenAI response did not contain text")
    return "\n".join(fragments).strip()


def build_prompt(row: dict[str, str], today: str) -> str:
    strategy = (ROOT / "docs" / "CONTENT.md").read_text(encoding="utf-8")
    return f"""Create today's review draft for Websiteli.

Date: {today}
Calendar day: {row['day']}
Task: {row['task']}
Primary target: {row['target']}
Format: {row['format']}
CTA: {row['cta']}
Priority: {row['priority']}

Repository content rules:
{strategy}

Requirements:
- Produce a substantial, usable draft appropriate to the requested format.
- For a long-form article, include: proposed slug, SEO title, meta description,
  audience, search intent, primary and secondary keywords, outline, complete
  English body, FAQs, suggested internal links, CTA, and a German translation brief.
- For a refresh or audit task, provide an exact implementation checklist plus
  replacement copy for the sections that should change.
- For social content, provide final copy plus a link/UTM placeholder and image brief.
- For diagrams or tables, provide the exact labels, structure, caption, and alt text.
- Reference only facts already established in the repository or clearly mark
  [VERIFY] placeholders.
- Do not claim the task has been published or implemented.
- End with a concise human-review checklist.
"""


def main() -> int:
    requested_date = os.environ.get("CONTENT_DATE")
    today = requested_date or dt.datetime.now(dt.timezone.utc).date().isoformat()
    rows = parse_calendar()
    row = rows.get(today)

    if row is None:
        print(f"No content-calendar task scheduled for {today}; nothing to generate.")
        return 0

    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    output_path = DRAFTS_DIR / f"{today}-day-{int(row['day']):02d}.md"
    if output_path.exists():
        print(f"Draft already exists: {output_path.relative_to(ROOT)}")
        return 0

    draft = request_openai(build_prompt(row, today))
    header = f"""---
date: {today}
calendar_day: {row['day']}
status: review-required
target: {json.dumps(row['target'])}
format: {json.dumps(row['format'])}
priority: {json.dumps(row['priority'])}
---

> Automatically generated from the Websiteli 30-day SEO calendar. This is not published content. Review facts, localization, links, claims, and formatting before use.

"""
    output_path.write_text(header + draft + "\n", encoding="utf-8")
    print(f"Generated {output_path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # Make workflow failures explicit.
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
