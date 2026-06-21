# Deployment

This project uses static Astro output for Hostpoint.

Pricing is resolved in the browser from an obfuscated frontend table. This is not secret against a determined visitor, but it avoids a plainly readable JSON table and only shows the selected market price in the UI.

Upload the full `dist/` folder.

## Hostpoint Static Deployment

Build the site:

```bash
npm run build
```

Deploy with the existing SFTP script:

```bash
npm run deploy:hostpoint
```

The page starts with Swiss fallback prices and updates visible prices after browser IP country detection.
