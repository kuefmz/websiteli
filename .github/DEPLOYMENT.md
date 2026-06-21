# Deployment

This project now uses Astro server output so `/api/pricing` and `/api/contact` can run backend code.

Deploy it to Hostpoint only if Hostpoint provides a Node.js app/runtime for your plan. Static shared hosting cannot run the geographic pricing API, read country headers at request time, or enrich contact submissions on the backend.

The old Hostpoint SFTP flow was for the previous static build and should be treated as legacy notes only. Uploading only `dist/client` will not work for backend pricing.

## Hostpoint Node Hosting Trial

If Hostpoint offers a Node.js app/runtime for your plan, build the generic Node server:

```bash
npm run build:node
```

The server entry file is:

```text
dist/server/entry.mjs
```

The runtime command is:

```bash
node dist/server/entry.mjs
```

Required runtime:

```text
Node.js 20 or newer
```

Hostpoint also needs to route public web traffic to the Node process, not only serve `dist/client` as static files. The success test is:

```text
https://websiteli.ch/api/pricing
```

That URL must return JSON. If it returns an Apache 404 page, the site is still static and backend pricing is not running.

If Hostpoint asks for a port, use the port they provide through the environment. The Astro Node adapter reads the `PORT` environment variable.
