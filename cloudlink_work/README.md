# CloudLink: Serverless URL Shortener with Expiring Links

CloudLink is a Cloud Computing course project built with Cloudflare Workers and Workers KV. It creates short URLs with optional custom aliases and expiry, then redirects visitors to the saved destination.

## Team

- Harsh Pandey — 2410030994
- Saksham Singh — 2410030795
- B.Tech CSE Core, Year 3, Semester 5
- Course: Cloud Computing | Faculty: Mr. Rohit Kumar

## GitHub repository`r`n`r`nhttps://github.com/harsh7523pandey-a11y/cloudlink-serverless-url-shortener`r`n`r`n## Live demo

https://cloudlink-shortener.harsh7523pandey202657.workers.dev

## Cloud architecture

`Browser → Cloudflare Worker (web UI + API + redirect) → Workers KV (link storage and TTL)`

## Features

- Random short aliases and custom aliases (3–20 letters, numbers, or hyphens)
- HTTP/HTTPS destination validation, 2048-character limit, and CloudLink self-link rejection
- Never-expiring, 24-hour, 7-day, and 30-day TTL choices
- Duplicate alias checks and HTTP 302 redirects
- HTTP 404 for missing or expired aliases; `HEAD` is supported for existing aliases

## Repository contents

- `cloudlink-worker/` — Worker source, Wrangler configuration, and deployment README
- `CloudLink-Project-Report.pdf` — final project report
- `CloudLink-Project-Report.md` — editable report source
- `CloudLink-Presentation-and-Viva.md` — presentation outline and viva questions
- `CloudLink-Submission-Kit.zip` — complete project and evidence bundle
- `CloudLink-*.png` — real demo, test, architecture, and Cloudflare dashboard screenshots

## Deploy

Requirements: Node.js, a Cloudflare account, and Wrangler CLI. Open PowerShell in the `cloudlink-worker` folder:

```powershell
npm install
npx wrangler login
npx wrangler deploy
```

The included `wrangler.toml` binds the `LINKS` Workers KV namespace used for the current demo. For a different Cloudflare account, create a KV namespace and update the namespace ID before deploying. See [`cloudlink-worker/README.md`](cloudlink-worker/README.md) for setup, test, and cleanup instructions.

## License and reference

The project was informed by the Workers + KV pattern in [L480/url-shortener](https://github.com/L480/url-shortener), which is licensed under Apache-2.0. Preserve the original license and attribution for any source reused from that repository. The reference repository's license should not be mistaken for a license applied to every file in this submission.
