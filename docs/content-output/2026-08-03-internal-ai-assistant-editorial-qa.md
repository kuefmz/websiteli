# Internal AI Assistant Article — Editorial QA

**Date reviewed:** 2026-08-03  
**Article:** `internal-ai-assistant-small-business`  
**Calendar task:** Review for Swiss relevance, privacy considerations, realistic examples, and unsupported claims.

## Result

The article is suitable for publication in its current form. No blog source file was changed in this task.

## Swiss and European relevance

- The English and German metadata explicitly target Swiss and European small businesses.
- The German copy uses appropriate KMU terminology and avoids country-specific legal claims that would require legal review.
- The article does not imply that one hosting, privacy, or security setup is universally suitable.
- The recommendation to begin with one team, one source collection, and one measurable task is realistic for smaller organisations.

## Privacy and permissions review

The article correctly states that an internal assistant should preserve the access rights of the original systems. It also covers identity verification, role-based access, source filtering, encrypted connections, logging, retention rules, and removal of obsolete content.

The wording remains implementation-oriented rather than presenting legal advice or claiming GDPR or Swiss data-protection compliance by default. This is appropriate.

## Examples and technical realism

The proposed first use cases are credible and bounded:

- finding the latest approved procedure;
- summarising a document;
- preparing a meeting brief;
- drafting an internal response from controlled sources;
- comparing approved information;
- routing uncertain questions to a responsible person.

The RAG explanation is accurate at a practical level and avoids suggesting that custom model training is always necessary. The article also distinguishes a narrow pilot from a company-wide multi-system assistant.

## Unsupported-claim review

No invented clients, testimonials, rankings, revenue outcomes, guaranteed savings, universal project prices, or unsupported statistics were found.

The statement that there is no responsible universal price is appropriate because project complexity depends on data quality, integrations, permissions, hosting, security, testing, monitoring, and ownership.

## Risk coverage

The article identifies the main operational risks:

- confident but unsupported answers;
- outdated sources;
- missing citations;
- permission leakage;
- unclear ownership.

It also gives proportionate mitigations: real-question testing, confidence thresholds, human escalation, and a limited first scope.

## Follow-up observations

These are non-blocking and were not changed because this task must not edit blog content:

1. The shared `makeTranslation` helper supplies English `keyTakeaways` and `chatGptPrompts` to every locale. The core article body and metadata are localized, but these supporting fields could be localized in a future dedicated blog-content task.
2. Several non-English locale bodies are intentionally shorter than the English and German versions. This is structurally valid, but future localization work could expand them for stronger local SEO depth.
3. Before any future claim about compliance, security certification, cost ranges, or measured business impact is added, it should be backed by repository-approved evidence.

## Editorial decision

**Approved for publication.** The article is practical, cautious, commercially relevant, and aligned with the current Websiteli content rules.