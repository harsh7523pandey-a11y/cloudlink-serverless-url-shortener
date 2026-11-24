# CloudLink: Serverless URL Shortener with Expiring Links

CloudLink is a Cloud Computing project built with **Cloudflare Workers** and **Workers KV**. It creates short URLs with optional custom aliases and expiry, then redirects visitors to the saved destination.

## Team

- **Harsh Pandey** — 2410030994
- **Saksham Singh** — 2410030795
- B.Tech CSE Core, Year 3, Semester 5
- Course: Cloud Computing | Faculty: Mr. Rohit Kumar

## GitHub Repository

https://github.com/harsh7523pandey-a11y/cloudlink-serverless-url-shortener

## Live Demo

[Open CloudLink](https://cloudlink-shortener.harsh7523pandey202657.workers.dev)

## Architecture

`Browser → Cloudflare Worker (web UI, API, redirects) → Workers KV (link mappings and TTL)`

![CloudLink interface](CloudLink-demo-created-link.png)

## Features

- Random short aliases and custom aliases (3–20 letters, numbers, or hyphens)
- HTTP/HTTPS URL validation, 2048-character limit, and CloudLink self-link rejection
- Never-expiring, 24-hour, 7-day, and 30-day link options
- Duplicate alias checks and HTTP 302 redirects
- HTTP 404 for missing or expired links; `HEAD` requests are supported

## Test Summary

- Valid HTTP and HTTPS links were created and redirected.
- Invalid URLs, JSON `null`, CloudLink self-links, and URLs over 2048 characters returned HTTP 400.
- Custom aliases, duplicate-alias rejection, unknown-alias HTTP 404, and `HEAD` redirect were verified.
- A 24-hour expiry option was selected and a link created. Expiration after the full 24 hours was not observed.

## Repository Contents

- [`cloudlink-worker/`](cloudlink-worker/) — Worker source, Wrangler configuration, and deployment instructions
- [Project report PDF](CloudLink-Project-Report.pdf) and [editable Markdown report](CloudLink-Project-Report.md)
- [Presentation outline and viva questions](CloudLink-Presentation-and-Viva.md)
- [Complete submission kit](CloudLink-Submission-Kit.zip)
- `CloudLink-*.png` — project screenshots and architecture diagram

## Deploy

Requirements: Node.js and a Cloudflare account. In PowerShell, open the `cloudlink-worker` folder and run:

```powershell
npm install
npx wrangler login
npx wrangler deploy
