import asyncio
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import main


async def inspect(url: str):
    normalized = main.normalize_url(url)
    await main.validate_public_target(normalized)
    pages = await main.crawl_site(normalized)
    host = main.urlparse(normalized).hostname or normalized
    title = pages[0]["title"] if pages else ""
    brand = main.extract_brand(title, host)
    profile = main.infer_market_profile(pages, brand)
    diagnostics = main.website_diagnostics(pages)
    return {
        "url": normalized,
        "brand": brand,
        "pages": len(pages),
        "profile": profile,
        "websiteScore": diagnostics["score"],
        "titles": [p["title"] for p in pages[:5]],
    }


async def main_check():
    orgelia, jenifer = await asyncio.gather(
        inspect("https://orgelia.com"),
        inspect("https://jeniferciuciukiss.com"),
    )

    print(json.dumps({"orgelia": orgelia, "jenifer": jenifer}, indent=2, ensure_ascii=False))

    assert orgelia["profile"]["siteType"] == "commercial", orgelia
    assert orgelia["profile"]["marketConfidence"] in {"medium", "high"}, orgelia
    orgelia_terms = " ".join(orgelia["profile"]["queryTerms"]).lower()
    assert any(term in orgelia_terms for term in ("pleasure", "product", "price", "shop")), orgelia

    assert jenifer["profile"]["siteType"] == "personal", jenifer
    assert jenifer["profile"]["marketConfidence"] == "low", jenifer
    assert "ciuciu-kiss" in jenifer["brand"].lower(), jenifer

    assert orgelia["profile"]["queryTerms"] != jenifer["profile"]["queryTerms"], {
        "orgelia": orgelia["profile"]["queryTerms"],
        "jenifer": jenifer["profile"]["queryTerms"],
    }


if __name__ == "__main__":
    asyncio.run(main_check())
