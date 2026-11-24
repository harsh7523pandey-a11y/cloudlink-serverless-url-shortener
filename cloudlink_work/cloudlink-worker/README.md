# CloudLink — Serverless URL Shortener

**Live deployment:** https://cloudlink-shortener.harsh7523pandey202657.workers.dev

A cloud-hosted URL shortener with optional custom aliases and automatic expiry. The Worker validates the URL and creates a short alias; Workers KV stores the alias-to-URL mapping and expires temporary links. Opening a short link redirects to the original URL.

## Cloud architecture

`Browser → Cloudflare Worker (web page + API + redirect) → Workers KV (persistent key/value storage)`

The Worker is the compute layer; KV is the managed storage layer. There is no virtual machine to maintain.

## Deploy (about 30–60 minutes)

### Requirements

- Cloudflare account and Node.js installed on your computer.
- In PowerShell, open this project folder.

### 1. Install Wrangler and sign in

```powershell
npm install
npx wrangler login
npx wrangler whoami
```

The login command opens a browser. Sign in to Cloudflare and approve Wrangler access. `whoami` should show the account you intend to use.

### 2. Create cloud storage

```powershell
npx wrangler kv namespace create LINKS
```

The submission kit's `wrangler.toml` is already configured with the namespace ID created for this deployment. If you create a different namespace, replace the `id` value in `wrangler.toml` with its ID.

### 3. Publish the app

```powershell
npx wrangler deploy
```

Wrangler prints a public `workers.dev` URL. Open it, paste a full URL beginning with `https://`, optionally enter a custom alias (3–20 letters, numbers or hyphens), choose an expiry, create a short link, then open the short link in a new tab to show the redirect. Submit the same custom alias twice to demonstrate duplicate protection; try an invalid URL to demonstrate validation.

### 4. Clean up after your presentation

If you do not want the cloud resources to remain, delete the Worker and the KV namespace from the Cloudflare dashboard. Check your account's current plan and usage before deploying; free-plan quotas and billing terms can change.

## Local preview

After creating the KV namespace and editing its ID:

```powershell
npx wrangler dev
```

## API

- `POST /api/shorten` with JSON `{"url":"https://example.com"}` returns a short URL.
- `GET /<alias>` looks up the URL in KV and responds with HTTP 302. Custom aliases may contain 3–20 letters, numbers, or hyphens.
- `HEAD /<alias>` resolves the same mapping without a response body.

## Notes

- Random aliases are seven characters; custom aliases are optional. This classroom demo does not implement sign-in, click analytics, abuse reporting, or rate limiting.
- Alias matching is case-sensitive: `Cloud` and `cloud` are different keys.
- Do not put sensitive or private links into a public demo.
- Project adapted as an educational implementation after reviewing [L480/url-shortener](https://github.com/L480/url-shortener), a Cloudflare Workers + KV reference repository (Apache-2.0). This implementation is independently written for a short classroom deployment.
