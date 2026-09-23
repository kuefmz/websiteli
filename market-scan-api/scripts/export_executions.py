import argparse
import csv
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import storage


def main() -> None:
    parser = argparse.ArgumentParser(description="Export persisted Websiteli Market Scan executions.")
    parser.add_argument("--limit", type=int, default=1000)
    parser.add_argument("--format", choices=("json", "csv"), default="json")
    parser.add_argument("--output", default="")
    args = parser.parse_args()

    rows = storage.list_executions(limit=args.limit)

    if args.format == "json":
        payload = json.dumps(rows, indent=2, ensure_ascii=False)
        if args.output:
            Path(args.output).write_text(payload, encoding="utf-8")
        else:
            print(payload)
        return

    fieldnames = [
        "id", "status", "submitted_url", "normalized_url", "brand",
        "started_at", "completed_at", "elapsed_ms", "error", "report_emailed_at",
    ]
    if args.output:
        handle = open(args.output, "w", newline="", encoding="utf-8")
        close = True
    else:
        handle = sys.stdout
        close = False
    try:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row.get(key) for key in fieldnames})
    finally:
        if close:
            handle.close()


if __name__ == "__main__":
    main()
