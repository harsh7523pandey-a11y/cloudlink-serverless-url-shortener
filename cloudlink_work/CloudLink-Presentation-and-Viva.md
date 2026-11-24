# CloudLink Presentation Outline and Viva Notes

## Suggested 5-slide presentation

### Slide 1 — Project overview

**CloudLink: Serverless URL Shortener with Expiring Links**

- Course: Cloud Computing
- Program: B.Tech CSE Core, Year 3, Semester 5th
- Students: Harsh Pandey (2410030994) and Saksham Singh (2410030795)
- Faculty: Mr. Rohit Kumar

### Slide 2 — Problem and solution

- Long URLs are inconvenient to share.
- CloudLink creates compact links and redirects visitors to the original URL.
- Users can select a custom alias and an expiry period.

### Slide 3 — Architecture

**Create flow:** Browser form → `POST /api/shorten` → Worker validates and writes alias + destination + TTL to KV → Worker returns short URL.

**Redirect flow:** Visitor → `GET /<alias>` → Worker reads KV → `302` to destination, or `404` if missing/expired.

- Browser provides the form and calls the API.
- Worker validates links and handles creation/redirect requests.
- KV stores alias-to-URL mappings and expires temporary links.

### Slide 4 — Live demonstration

1. Create a valid short link and open it to show the redirect.
2. Create a custom alias and try using it again to show duplicate protection.
3. Submit an invalid URL to show validation.
4. Explain that a selected expiry is stored as a KV time-to-live.

### Slide 5 — Cloud concepts and next steps

- Serverless compute, managed key-value storage, HTTP API, edge deployment and TTL.
- Future additions: authentication, rate limiting, click analytics and QR codes.
- State the live deployment URL and summarize the test results.

**Live URL:** https://cloudlink-shortener.harsh7523pandey202657.workers.dev

## Viva questions and short answers

**1. What makes this a cloud computing project?**  
The web application logic runs as a managed serverless Worker and its link data is stored in cloud-hosted Workers KV. It is deployed to a public cloud URL and does not require a VM managed by the student.

**2. What is serverless computing?**  
It is a cloud execution model where the provider provisions and operates the underlying servers while the developer deploys code that responds to events or requests. Servers still exist, but the application owner does not manage them directly.

**3. What is Workers KV?**  
It is Cloudflare's managed key-value storage service. In this project the short alias is the key and the original URL is the value.

**4. What happens when a user opens a short link?**  
The Worker extracts the alias, reads its destination from KV, and returns an HTTP 302 redirect. If there is no mapping, the Worker returns 404.

**5. How does expiry work?**  
The chosen lifetime is passed as the KV `expirationTtl` when the mapping is written. After that period the mapping expires and the Worker can no longer resolve it.

**6. Why validate the protocol?**  
The application only accepts HTTP and HTTPS URLs to avoid storing malformed or unsupported destinations.

**7. What are the main limitations?**  
This classroom prototype has no login, abuse controls, rate limiting or analytics. KV's duplicate check followed by a write is not a transactional uniqueness guarantee under high concurrency.

**8. How could the project be improved?**  
Add authentication, rate limiting, abuse reporting, analytics, a QR code feature, and a storage design with atomic uniqueness for custom aliases.

**9. What is a TTL?**  
Time to live: the number of seconds a key should remain in KV before expiring.

**10. Why does CloudLink use HTTP 302 instead of 301?**  
302 is a temporary redirect and is less likely to be cached permanently by browsers. A 301 indicates a permanent redirect.

**11. What is a race condition in custom alias creation?**  
Two requests can both check that an alias is free before either writes it. Both may then write the same key because the check and write are separate.

**12. What does eventual consistency mean for Workers KV?**  
A recent write may take time to appear in every Cloudflare location. A remote visitor could briefly see a not-found response after link creation.

**13. Why is Workers KV suitable for short links?**  
Short links are usually read more often than they are created, and KV is designed for globally distributed, read-heavy workloads.

**14. How does Cloudflare Workers differ from AWS Lambda?**  
Both run code without a VM to manage. Workers run on Cloudflare's network and can use KV bindings; Lambda uses AWS execution environments and commonly integrates with DynamoDB and API Gateway.

**15. Why can a newly created short link briefly return 404 in another region?**  
KV caches missing-key lookups as well as existing values. Other locations may not observe the new key until cached data expires or refreshes.
