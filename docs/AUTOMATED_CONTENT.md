# Daily SEO Content Automation

The workflow at `.github/workflows/daily-seo-content.yml` generates one reviewable draft per calendar day from `docs/CONTENT_CALENDAR_2026-07-29_TO_2026-08-27.md`.

## Safety model

- Generated content is written to `content-drafts/`.
- It is never added directly to the public Astro content registry.
- The workflow opens or updates a pull request for human review.
- It does not merge, publish, or deploy automatically.
- Existing drafts are not overwritten.
- Dates outside the current calendar produce no changes.

## Required repository secret

In GitHub, open:

`Settings -> Secrets and variables -> Actions -> New repository secret`

Add:

- Name: `OPENAI_API_KEY`
- Value: an OpenAI API key with sufficient billing/usage limits

Never commit the key to the repository.

## Optional repository variable

Under `Settings -> Secrets and variables -> Actions -> Variables`, add:

- Name: `OPENAI_MODEL`
- Value: the model to use

If omitted, the workflow uses `gpt-5`.

## Schedule

The workflow runs at `05:30 UTC` every day, which is `07:30` in Zurich during summer time. GitHub cron schedules use UTC and may start a few minutes late during busy periods.

## Manual test

1. Merge the pull request that adds this automation.
2. Add the `OPENAI_API_KEY` repository secret.
3. Open `Actions -> Daily SEO content draft`.
4. Click `Run workflow`.
5. Enter a date from the calendar, such as `2026-07-29`, or leave it empty for the current date.
6. Review the generated pull request and the file under `content-drafts/`.

## Editorial process

Before using a generated draft publicly:

- verify all facts and remove or resolve `[VERIFY]` placeholders;
- check Swiss market relevance;
- confirm prices and service claims against current Websiteli pages;
- verify internal links and CTAs;
- manually review German copy;
- adapt the draft to the TypeScript blog format described in `docs/CONTENT.md`;
- run formatting, tests, and the production build.

## Extending the calendar

The script reads Markdown table rows with the following columns:

`Day | Date | Content or task | Primary target | Format | CTA | Priority`

To continue beyond the current 30 days, add a new dated calendar document and update `CALENDAR_PATH` in `scripts/generate_daily_content.py`, or refactor the script to discover the active calendar automatically.
