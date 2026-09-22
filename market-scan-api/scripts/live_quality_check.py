import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient
import main


def compact_report(payload):
    report = payload["report"]
    return {
        "brand": report["brand"],
        "scannedUrl": report["scannedUrl"],
        "summary": report["summary"],
        "marketProfile": report["marketProfile"],
        "research": report.get("research", {}),
        "executive": report["executive"],
        "competitors": [
            {"name": x["name"], "url": x["url"], "context": x.get("context", "")}
            for x in report["competitorCandidates"][:5]
        ],
        "buyerSignals": [
            {"title": x.get("title", ""), "url": x.get("url", ""), "relevance": x.get("relevance")}
            for x in report["buyerSignals"][:5]
        ],
        "painPoints": [
            {"title": x.get("title", ""), "url": x.get("url", ""), "relevance": x.get("relevance")}
            for x in report["painPoints"][:5]
        ],
        "contentOpportunities": report["contentOpportunities"][:4],
        "adAngles": report["adAngles"][:4],
    }


def main_check():
    client = TestClient(main.app)
    main.rate_buckets.clear()
    main.report_cache.clear()

    orgelia_response = client.post("/api/scan", json={"url": "https://orgelia.com"})
    assert orgelia_response.status_code == 200, orgelia_response.text
    orgelia = compact_report(orgelia_response.json())

    personal_response = client.post("/api/scan", json={"url": "https://jeniferciuciukiss.com"})
    assert personal_response.status_code == 200, personal_response.text
    jenifer = compact_report(personal_response.json())

    print(json.dumps({"orgelia": orgelia, "jenifer": jenifer}, indent=2, ensure_ascii=False))

    # Real-site classification expectations.
    assert orgelia["marketProfile"]["siteType"] == "commercial", orgelia
    assert orgelia["marketProfile"]["marketConfidence"] in {"medium", "high"}, orgelia
    orgelia_terms = " ".join(orgelia["marketProfile"]["queryTerms"]).lower()
    assert any(term in orgelia_terms for term in ("pleasure", "product", "price", "shop")), orgelia

    assert jenifer["marketProfile"]["siteType"] == "personal", jenifer
    assert jenifer["marketProfile"]["marketConfidence"] == "low", jenifer
    assert "ciuciu-kiss" in jenifer["brand"].lower(), jenifer

    # Personal/professional sites must not be padded with a fake buyer market.
    assert jenifer["summary"]["buyerSignals"] == 0, jenifer
    assert jenifer["summary"]["redditDiscussions"] == 0, jenifer
    assert jenifer["summary"]["competitorCandidates"] == 0, jenifer
    assert jenifer["summary"]["adAngles"] == 0, jenifer

    # Search plans/results must be website-specific rather than reused.
    assert orgelia["marketProfile"]["queryTerms"] != jenifer["marketProfile"]["queryTerms"]
    assert orgelia["research"].get("queries") != jenifer["research"].get("queries")

    banned = main.AGGREGATOR_HOSTS
    for competitor in orgelia["competitors"]:
        host = (main.urlparse(competitor["url"]).hostname or "").removeprefix("www.")
        assert host not in banned, competitor

    # Every surfaced buyer/pain result must have passed the relevance filter.
    for item in orgelia["buyerSignals"] + orgelia["painPoints"]:
        assert item["relevance"] is None or item["relevance"] >= 0.72, item


if __name__ == "__main__":
    main_check()
