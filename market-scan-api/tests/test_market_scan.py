from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest
from fastapi.testclient import TestClient

import main


def make_page(
    url,
    title,
    description,
    headings,
    text,
    *,
    forms=0,
    h1=1,
    analytics=True,
    schema=False,
    viewport="width=device-width, initial-scale=1",
    strong_cta=True,
    booking=False,
):
    return {
        "url": url,
        "title": title,
        "description": description,
        "canonical": url,
        "viewport": viewport,
        "headings": headings,
        "ctas": ["Get started"] if strong_cta else [],
        "text": text,
        "formCount": forms,
        "h1Count": h1,
        "mailtoCount": 1 if "contact" in text.lower() else 0,
        "phoneCount": 0,
        "hasAnalytics": analytics,
        "hasSchema": schema,
        "hasBooking": booking,
        "hasStrongCta": strong_cta,
        "links": [],
    }


# These fixtures mirror the actual positioning visible on the two sites used for QA.
ORGELIA_PAGES = [
    make_page(
        "https://orgelia.com/",
        "Orgelia - Pleasure Product Price Comparison",
        "Find the pleasure product you want, compare prices across trusted stores and see where it is cheapest with Orgelia.",
        [
            "Find your f*cking favourite.",
            "Same toy. Different price.",
            "Find intimate shops near you.",
        ],
        (
            "Compare pleasure products, prices and features across trusted stores. "
            "Browse vibrators, couples toys, intimate products, Swiss shops and brands. "
            "Find the product you want and compare where it is cheapest."
        ),
        forms=1,
    ),
    make_page(
        "https://orgelia.com/products/",
        "Products | Orgelia",
        "Compare intimate products and prices.",
        ["Compare pleasure products", "Vibrators", "Couples toys"],
        "Compare sex toys, vibrators, couples toys and intimate products across stores and prices.",
    ),
    make_page(
        "https://orgelia.com/shops/",
        "Sex shops in Switzerland | Orgelia",
        "Discover intimate shops across Switzerland.",
        ["Find intimate shops near you", "Swiss sex shops"],
        "Browse online and physical sex shops in Switzerland and compare retailers.",
    ),
]

JENIFER_PAGES = [
    make_page(
        "https://jeniferciuciukiss.com/",
        "Jenifer Tabita Ciuciu-Kiss | AI & Data Engineer in Zurich",
        (
            "AI & Data Engineer in Zurich. I build machine learning, LLM/RAG, document automation, "
            "data pipeline and knowledge graph systems while completing a part-time PhD in Artificial Intelligence."
        ),
        [
            "Jenifer Ciuciu-Kiss is an AI & Data Engineer in Zurich.",
            "AI & ML Systems",
            "Data Engineering & Automation",
            "Research Software & NLP",
            "Knowledge Graphs & Ontologies",
            "For recruiters and collaborators",
        ],
        (
            "Personal portfolio for recruiters and collaborators. Machine learning, NLP, LLM applications, "
            "RAG, data engineering, research software, publications, PhD research and public projects. "
            "Contact Jenifer and view CV."
        ),
        forms=1,
    ),
    make_page(
        "https://jeniferciuciukiss.com/projects/",
        "Projects | Jenifer Ciuciu-Kiss",
        "Projects in ML, RAG, OCR, knowledge graphs and web systems.",
        ["Applied work", "Machine learning and data projects"],
        "Public portfolio projects and case studies.",
    ),
    make_page(
        "https://jeniferciuciukiss.com/research/",
        "Research | Jenifer Ciuciu-Kiss",
        "PhD research in research software classification, semantic web and NLP.",
        ["PhD research", "Publications"],
        "Research software classification, knowledge graphs, ontology engineering and publications.",
    ),
]


@pytest.fixture(autouse=True)
def reset_state():
    main.rate_buckets.clear()
    main.report_cache.clear()
    yield
    main.rate_buckets.clear()
    main.report_cache.clear()


def test_hyphenated_personal_name_is_not_truncated():
    assert (
        main.extract_brand(
            "Jenifer Tabita Ciuciu-Kiss | AI & Data Engineer in Zurich",
            "jeniferciuciukiss.com",
        )
        == "Jenifer Tabita Ciuciu-Kiss"
    )


def test_orgelia_is_identified_as_commercial_price_comparison():
    profile = main.infer_market_profile(ORGELIA_PAGES, "Orgelia")
    assert profile["siteType"] == "commercial"
    assert profile["marketConfidence"] == "high"
    joined = " ".join(profile["queryTerms"]).lower()
    assert "pleasure" in joined
    assert "product" in joined or "price" in joined


def test_personal_site_is_not_forced_into_a_buyer_market():
    profile = main.infer_market_profile(JENIFER_PAGES, "Jenifer Tabita Ciuciu-Kiss")
    assert profile["siteType"] == "personal"
    assert profile["marketConfidence"] == "low"


def test_relevance_filter_rejects_unrelated_same_generic_results():
    terms = ["pleasure product", "price comparison"]
    items = [
        {
            "title": "Looking for a pleasure product price comparison in Switzerland",
            "snippet": "Compare intimate products and prices across trusted stores.",
            "url": "https://example.ch/relevant",
        },
        {
            "title": "Best statistical software for research teams",
            "snippet": "Compare analytics tools and data platforms.",
            "url": "https://example.com/unrelated",
        },
    ]
    kept = main.filter_relevant(items, terms, 0.72)
    assert [x["url"] for x in kept] == ["https://example.ch/relevant"]


def test_aggregators_are_not_presented_as_competitors():
    results = [
        {
            "title": "Pleasure product price comparison alternative in Switzerland",
            "snippet": "Swiss intimate products and sex toys.",
            "url": "https://kisskiss.ch/",
        },
        {
            "title": "Pleasure product price comparison software rankings",
            "snippet": "Market overview.",
            "url": "https://g2.com/categories/example",
        },
        {
            "title": "Pleasure product price comparison market guide",
            "snippet": "Analyst report.",
            "url": "https://gartner.com/example",
        },
    ]
    candidates = main.market_candidates(results, "orgelia.com")
    assert [x["name"] for x in candidates] == ["kisskiss.ch"]


def test_review_mentions_require_real_review_hosts_and_brand_match():
    results = [
        {
            "title": "Orgelia reviews",
            "snippet": "Customer reviews of Orgelia.",
            "url": "https://www.trustpilot.com/review/orgelia.com",
        },
        {
            "title": "Orgelia on LinkedIn",
            "snippet": "Company profile.",
            "url": "https://linkedin.com/company/orgelia",
        },
        {
            "title": "Reviews",
            "snippet": "Generic unrelated review page.",
            "url": "https://www.trustpilot.com/review/unrelated.example",
        },
    ]
    mentions = main.extract_review_mentions(results, "orgelia.com", "Orgelia")
    assert len(mentions) == 1
    assert "trustpilot.com/review/orgelia.com" in mentions[0]["url"]




def test_market_research_and_blog_pages_are_not_competitors():
    results = [
        {
            "title": "Switzerland Intimate Products Market Report",
            "snippet": "Industry research and market forecast.",
            "url": "https://6wresearch.com/industry-report/switzerland-intimate-products-market",
            "relevance": 1.0,
        },
        {
            "title": "Phthalates in Sex Toys: A Pharmacist's Guide",
            "snippet": "Guide to sex toy safety in Switzerland.",
            "url": "https://condoms-switzerland.ch/guides/phthalates-danger-sex-toys/",
            "relevance": 1.0,
        },
        {
            "title": "Swiss sex shop - discreet delivery",
            "snippet": "Online sex shop in Switzerland with toys and accessories.",
            "url": "https://kisskiss.ch/en/",
            "relevance": 1.0,
        },
    ]
    candidates = main.market_candidates(results, "orgelia.com", "Switzerland")
    assert [x["name"] for x in candidates] == ["kisskiss.ch"]
    assert candidates[0]["type"] == "direct"


def test_price_comparison_content_opportunities_are_actionable():
    profile = {
        "positioning": "Compare prices across trusted stores and see where it is cheapest.",
        "queryTerms": ["price comparison", "pleasure product"],
    }
    items = main.site_specific_content_opportunities(profile, ORGELIA_PAGES, [])
    titles = [x["title"].lower() for x in items]
    assert any("comparison works" in title for title in titles)
    assert any("total purchase cost" in title for title in titles)
    assert all("price comparison: how it works" not in title for title in titles)

def test_vendor_pages_are_not_counted_as_buyer_conversations():
    items = [
        {
            "title": "Switzerland online Sexshop | Discreet Sextoys Purchase",
            "snippet": "Shop sex toys and intimate products at the best prices.",
            "url": "https://kisskiss.ch/en/",
        },
        {
            "title": "Looking for a sex toy shop in Switzerland?",
            "snippet": "Can anyone recommend a discreet store with good prices?",
            "url": "https://www.reddit.com/r/AskSwitzerland/comments/example",
        },
    ]
    buyer, _ = main.classify_signals(items)
    assert len(buyer) == 1
    assert "reddit.com" in buyer[0]["url"]

def test_no_generic_ad_angles_without_real_buyer_or_pain_evidence():
    assert main.make_ad_angles([], [], [{"term": "software", "count": 20}]) == []


def test_orgelia_and_personal_site_do_not_generate_same_research_plan():
    orgelia = main.infer_market_profile(ORGELIA_PAGES, "Orgelia")
    jenifer = main.infer_market_profile(JENIFER_PAGES, "Jenifer Tabita Ciuciu-Kiss")
    orgelia_queries = main.build_market_queries(orgelia, "Orgelia")
    assert orgelia_queries
    assert jenifer["siteType"] == "personal"
    assert orgelia["queryTerms"] != jenifer["queryTerms"]



def test_personal_site_gets_at_least_three_client_focused_improvements():
    diagnostics = main.website_diagnostics(JENIFER_PAGES)
    profile = main.infer_market_profile(JENIFER_PAGES, "Jenifer Tabita Ciuciu-Kiss")
    improvements = main.website_improvements(diagnostics, JENIFER_PAGES, profile)
    assert len(improvements) >= 3
    for item in improvements:
        assert item["title"]
        assert item["whyRelevant"]
        assert item["clientImpact"]
        assert item["basis"]
    assert any("client" in item["clientImpact"].lower() or "recruit" in item["clientImpact"].lower() for item in improvements)


def test_commercial_site_gets_at_least_three_actionable_improvements():
    diagnostics = main.website_diagnostics(ORGELIA_PAGES)
    profile = main.infer_market_profile(ORGELIA_PAGES, "Orgelia")
    improvements = main.website_improvements(diagnostics, ORGELIA_PAGES, profile)
    assert len(improvements) >= 3
    assert all(item["whyRelevant"] and item["clientImpact"] for item in improvements)


def test_frontend_declares_summary_before_using_it():
    component = (
        Path(__file__).resolve().parents[2]
        / "src"
        / "components"
        / "MarketScan.astro"
    ).read_text(encoding="utf-8")
    render_start = component.index("function render(data)")
    render_end = component.index("function startLoadingProgress", render_start)
    render = component[render_start:render_end]
    assert render.index("const summary=") < render.index("summary.buyerSignals")


def test_endpoint_results_are_materially_different_for_orgelia_and_personal_site(monkeypatch):
    monkeypatch.setattr(main, "post_market_scan_execution", lambda **kwargs: None)

    async def fake_validate(_url):
        return None

    async def fake_crawl(url):
        return ORGELIA_PAGES if "orgelia.com" in url else JENIFER_PAGES

    async def fake_reddit(query):
        if "pleasure" not in query.lower():
            return []
        return [
            {
                "title": "Looking for a pleasure product price comparison in Switzerland",
                "body": "I want to compare intimate products and trusted shops.",
                "subreddit": "AskSwitzerland",
                "score": 10,
                "comments": 4,
                "url": "https://www.reddit.com/r/AskSwitzerland/comments/relevant",
                "query": query,
                "provider": "Reddit",
            },
            {
                "title": "Which statistical software is best?",
                "body": "Research tooling discussion.",
                "subreddit": "statistics",
                "score": 100,
                "comments": 50,
                "url": "https://www.reddit.com/r/statistics/comments/unrelated",
                "query": query,
                "provider": "Reddit",
            },
        ]

    async def fake_ddg(query, limit=12):
        q = query.lower()
        if "reviews" in q:
            if "orgelia" in q:
                return [
                    {
                        "title": "Orgelia customer reviews",
                        "snippet": "Customer reviews for Orgelia.",
                        "url": "https://www.trustpilot.com/review/orgelia.com",
                        "query": query,
                        "provider": "DuckDuckGo",
                    }
                ]
            return [
                {
                    "title": "Jenifer Ciuciu-Kiss on LinkedIn",
                    "snippet": "Professional profile.",
                    "url": "https://linkedin.com/in/example",
                    "query": query,
                    "provider": "DuckDuckGo",
                }
            ]
        if "alternatives" in q or "competitors" in q:
            return [
                {
                    "title": "Pleasure product price comparison alternative - KissKiss",
                    "snippet": "Swiss intimate products, sex toys and prices.",
                    "url": "https://kisskiss.ch/",
                    "query": query,
                    "provider": "DuckDuckGo",
                },
                {
                    "title": "Pleasure product price comparison category report",
                    "snippet": "Software marketplace.",
                    "url": "https://g2.com/categories/example",
                    "query": query,
                    "provider": "DuckDuckGo",
                },
            ]
        if "problems" in q or "complaints" in q:
            return [
                {
                    "title": "Pleasure product price comparison is frustrating when delivery costs are hidden",
                    "snippet": "Shoppers say comparing intimate products is difficult when shipping costs differ.",
                    "url": "https://example.ch/pain",
                    "query": query,
                    "provider": "DuckDuckGo",
                }
            ]
        return [
            {
                "title": "Looking for a pleasure product price comparison in Switzerland",
                "snippet": "I want to compare intimate products, shops and prices.",
                "url": "https://example.ch/buyer",
                "query": query,
                "provider": "DuckDuckGo",
            }
        ]

    monkeypatch.setattr(main, "validate_public_target", fake_validate)
    monkeypatch.setattr(main, "crawl_site", fake_crawl)
    monkeypatch.setattr(main, "reddit_search", fake_reddit)
    monkeypatch.setattr(main, "ddg_search", fake_ddg)

    client = TestClient(main.app)

    orgelia_response = client.post("/api/scan", json={"url": "https://orgelia.com"})
    assert orgelia_response.status_code == 200, orgelia_response.text
    orgelia = orgelia_response.json()["report"]

    personal_response = client.post(
        "/api/scan", json={"url": "https://jeniferciuciukiss.com"}
    )
    assert personal_response.status_code == 200, personal_response.text
    personal = personal_response.json()["report"]

    assert orgelia["marketProfile"]["siteType"] == "commercial"
    assert orgelia["marketProfile"]["marketConfidence"] == "high"
    assert orgelia["summary"]["buyerSignals"] >= 1
    assert orgelia["summary"]["competitorCandidates"] >= 1
    assert any(x["name"] == "kisskiss.ch" for x in orgelia["competitorCandidates"])
    assert all("g2.com" not in x["url"] for x in orgelia["competitorCandidates"])

    assert personal["marketProfile"]["siteType"] == "personal"
    assert personal["marketProfile"]["marketConfidence"] == "low"
    assert personal["summary"]["buyerSignals"] == 0
    assert personal["summary"]["redditDiscussions"] == 0
    assert personal["summary"]["competitorCandidates"] == 0
    assert personal["summary"]["adAngles"] == 0

    assert orgelia["summary"] != personal["summary"]
    assert orgelia["contentOpportunities"] != personal["contentOpportunities"]



def test_newsletter_api_is_configured_by_default(monkeypatch):
    monkeypatch.delenv("NEWSLETTER_API_URL", raising=False)
    assert main.email_configured() is True
    assert "script.google.com/macros/s/" in main.newsletter_api_url()


def test_send_report_email_uses_existing_newsletter_api(monkeypatch):
    monkeypatch.setenv("NEWSLETTER_API_URL", "https://example.test/newsletter")

    captured = {}

    class Response:
        def raise_for_status(self):
            return None

    def fake_post(url, **kwargs):
        captured["url"] = url
        captured.update(kwargs)
        return Response()

    monkeypatch.setattr(main.httpx, "post", fake_post)
    monkeypatch.setattr(main, "report_email_html", lambda report: "<p>report</p>")

    report = {
        "brand": "Example",
        "scanId": "scan-123",
        "scannedUrl": "https://example.com/",
    }
    main.send_report_email(
        "client@example.com",
        report,
        source_url="https://websiteli.ch/en/market-scan/",
        language="en",
        metadata={"utm_source": "test"},
    )

    assert captured["url"] == "https://example.test/newsletter"
    assert captured["headers"]["content-type"] == "text/plain;charset=utf-8"
    payload = main.json.loads(captured["content"].decode("utf-8"))
    assert payload["type"] == "market-scan-report"
    assert payload["email"] == "client@example.com"
    assert payload["campaign"] == "market-scan-report"
    assert payload["metadata"]["utm_source"] == "test"
    assert payload["metadata"]["reportDeliveryRequested"] is True
    assert payload["metadata"]["report"] == report
    assert payload["metadata"]["reportHtml"] == "<p>report</p>"




def test_market_scan_execution_posts_to_google_sheet_endpoint(monkeypatch):
    monkeypatch.setenv("NEWSLETTER_API_URL", "https://example.test/websiteli")

    captured = {}

    class Response:
        def raise_for_status(self):
            return None

    def fake_post(url, **kwargs):
        captured["url"] = url
        captured.update(kwargs)
        return Response()

    monkeypatch.setattr(main.httpx, "post", fake_post)

    report = {
        "brand": "Example",
        "scannedUrl": "https://example.com/",
        "elapsedMs": 321,
        "summary": {
            "buyerSignals": 2,
            "competitorCandidates": 1,
            "reviewMentions": 3,
            "priorityActions": 4,
            "pagesCrawled": 5,
        },
        "website": {"opportunityScore": 72},
        "research": {"queries": {"buyer": ["example buyer intent"]}},
    }

    main.post_market_scan_execution(
        scan_id="scan-123",
        status="completed",
        submitted_url="example.com",
        normalized_url="https://example.com/",
        elapsed_ms=321,
        report=report,
    )

    assert captured["url"] == "https://example.test/websiteli"
    payload = main.json.loads(captured["content"].decode("utf-8"))
    assert payload["type"] == "market-scan-execution"
    assert payload["scanId"] == "scan-123"
    assert payload["status"] == "completed"
    assert payload["report"] == report
    assert payload["report"]["research"]["queries"]["buyer"] == ["example buyer intent"]
