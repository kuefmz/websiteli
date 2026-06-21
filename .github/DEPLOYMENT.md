# Deployment

This project now uses Astro server output so `/api/pricing` and `/api/contact` can run backend code.

Deploy it to a server-capable Astro host such as Vercel. Static shared hosting cannot run the geographic pricing API, read CDN country headers at request time, or enrich contact submissions on the backend.

The old Hostpoint SFTP flow was for the previous static build and should be treated as legacy notes only.
