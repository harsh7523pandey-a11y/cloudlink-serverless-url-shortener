const HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#071b2e"><title>CloudLink — Serverless URL Shortener</title>
<style>
:root{color-scheme:dark;--bg:#071b2e;--panel:#0d2740;--line:#1d3d59;--mint:#6ef0c2;--muted:#9bb0c4;--white:#f5fbff}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(ellipse at 70% 0%,#123a51 0,transparent 42%),var(--bg);color:var(--white);font:16px/1.55 Inter,ui-sans-serif,system-ui,Segoe UI,sans-serif}.wrap{max-width:1050px;margin:0 auto;padding:32px 24px 60px}.nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:70px}.brand{font-weight:800;letter-spacing:-.04em;font-size:20px}.brand b{color:var(--mint)}.pill{font-size:12px;border:1px solid #31546d;border-radius:99px;padding:7px 12px;color:#b9ccdc}.hero{max-width:760px;margin:0 auto 48px;text-align:center}.eyebrow{color:var(--mint);font-size:12px;font-weight:800;letter-spacing:.15em;text-transform:uppercase}.hero h1{font-size:clamp(42px,8vw,76px);letter-spacing:-.065em;line-height:.99;margin:16px 0 18px}.hero h1 span{color:var(--mint)}.hero p{max-width:600px;margin:0 auto;color:var(--muted);font-size:18px}.card{max-width:760px;margin:auto;border:1px solid var(--line);border-radius:20px;background:linear-gradient(145deg,#102d47,#0a2036);padding:28px;box-shadow:0 30px 80px #0004}.field{display:block;color:#d9e8f3;font-size:13px;font-weight:700;margin-bottom:8px}.urlrow{display:flex;gap:10px}.urlrow input,.options input,.options select{width:100%;border:1px solid #34536d;background:#071b2e;color:var(--white);border-radius:11px;padding:14px 15px;font:inherit;outline:none}.urlrow input:focus,.options input:focus,.options select:focus{border-color:var(--mint);box-shadow:0 0 0 3px #6ef0c21a}.urlrow button{white-space:nowrap}.options{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}.options small{display:block;color:var(--muted);font-size:12px;margin-top:6px}.options select{appearance:auto}.primary{border:0;border-radius:11px;padding:13px 20px;background:var(--mint);color:#082334;font:800 15px system-ui;cursor:pointer;transition:transform .15s,background .15s}.primary:hover{background:#9bf9d8;transform:translateY(-1px)}.result{display:none;margin-top:20px;border:1px solid #266c5a;background:#092d2a;border-radius:12px;padding:16px}.result.error{border-color:#814b48;background:#351e24;color:#ffc0b6}.result a{color:var(--mint);font-weight:800;word-break:break-all}.resultline{display:flex;gap:12px;align-items:center;justify-content:space-between}.copy{border:1px solid #477568;background:#113d38;color:var(--mint);border-radius:8px;padding:8px 12px;cursor:pointer;font-weight:700}.features{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:900px;margin:42px auto}.feature{border-top:1px solid var(--line);padding:17px 8px}.feature strong{display:block;margin:5px 0}.feature span{color:var(--muted);font-size:13px}.icon{color:var(--mint);font-size:18px}.architecture{max-width:760px;margin:auto;border:1px solid var(--line);background:#091f33;border-radius:14px;padding:18px 20px;color:var(--muted);font-size:13px;text-align:center}.architecture b{color:#dceaf4}.footer{max-width:760px;margin:28px auto 0;color:#71879b;font-size:12px;display:flex;justify-content:space-between;gap:12px}a{color:inherit}@media(max-width:650px){.wrap{padding:22px 16px}.nav{margin-bottom:50px}.card{padding:20px}.urlrow{flex-direction:column}.options,.features{grid-template-columns:1fr}.feature{padding:8px}.footer{flex-direction:column}}
</style></head><body><main class="wrap"><header class="nav"><div class="brand">☁ Cloud<b>Link</b></div><div class="pill">SERVERLESS · CLOUD COMPUTING PROJECT</div></header><section class="hero"><div class="eyebrow">Short links. Global cloud.</div><h1>Make every link<br><span>share-ready.</span></h1><p>A fast, serverless URL shortener. Create memorable links, set an expiry, and let the cloud handle the rest.</p></section><section class="card"><form id="f"><label class="field" for="url">Your destination URL</label><div class="urlrow"><input id="url" type="url" placeholder="https://example.com/a/very/long/page" required><button class="primary" id="submit">Create short link ↗</button></div><div class="options"><label><span class="field">Custom alias <span style="color:#9bb0c4;font-weight:400">(optional)</span></span><input id="alias" type="text" minlength="3" maxlength="20" pattern="[A-Za-z0-9-]{3,20}" placeholder="e.g. my-project"><small>3–20 letters, numbers or hyphens</small></label><label><span class="field">Link expiry</span><select id="expiry"><option value="0">Never expires</option><option value="86400">24 hours</option><option value="604800">7 days</option><option value="2592000">30 days</option></select><small>Expired links stop redirecting</small></label></div></form><div id="r" class="result" aria-live="polite"></div></section><section class="features"><div class="feature"><div class="icon">◉</div><strong>Edge serverless</strong><span>Requests run on Cloudflare Workers without managing a VM.</span></div><div class="feature"><div class="icon">▤</div><strong>Persistent cloud storage</strong><span>Alias mappings live in Workers KV, a managed key-value database.</span></div><div class="feature"><div class="icon">⌛</div><strong>Expiry controls</strong><span>Choose an expiry or keep a link active indefinitely.</span></div></section><section class="architecture"><b>Browser</b> → <b>Cloudflare Worker</b> (web app + API + redirects) → <b>Workers KV</b> (persistent link data)</section><footer class="footer"><span>CloudLink · Student cloud computing project</span><span>Built with Cloudflare Workers + Workers KV</span></footer></main><script>
const f=document.querySelector('#f'),r=document.querySelector('#r'),button=document.querySelector('#submit');f.addEventListener('submit',async e=>{e.preventDefault();r.style.display='block';r.className='result';r.textContent='Creating your link…';button.disabled=true;try{const res=await fetch('/api/shorten',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:document.querySelector('#url').value,alias:document.querySelector('#alias').value.trim(),ttl:Number(document.querySelector('#expiry').value)})});const d=await res.json();if(!res.ok)throw Error(d.error||'Could not create link');r.innerHTML='<div class="resultline"><div>Your short link<br><a target="_blank" rel="noopener" href="'+d.shortUrl+'">'+d.shortUrl+'</a></div><button class="copy" type="button">Copy</button></div><div style="font-size:12px;color:#9bb0c4;margin-top:8px">'+d.message+'</div>';r.querySelector('.copy').onclick=async()=>{await navigator.clipboard.writeText(d.shortUrl);r.querySelector('.copy').textContent='Copied ✓'}}catch(e){r.className='result error';r.textContent=e.message}finally{button.disabled=false}});
</script></body></html>`;

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

function validHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch { return false; }
}

const aliasPattern = /^[a-zA-Z0-9-]{3,20}$/;
const allowedTtls = new Set([0, 86400, 604800, 2592000]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (request.method === "POST" && url.pathname === "/api/shorten") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "Please send valid JSON." }, 400); }
      if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Please send a JSON object." }, 400);
      if (typeof body.url !== "string" || !body.url.trim()) return json({ error: "Enter a valid http or https URL." }, 400);
      if (body.url.length > 2048) return json({ error: "URL must be 2048 characters or fewer." }, 400);
      if (!validHttpUrl(body.url)) return json({ error: "Enter a valid http or https URL." }, 400);
      const alias = typeof body.alias === "string" ? body.alias.trim() : "";
      if (alias && !aliasPattern.test(alias)) return json({ error: "Alias must be 3–20 letters, numbers or hyphens." }, 400);
      const ttl = Number(body.ttl ?? 0);
      if (!allowedTtls.has(ttl)) return json({ error: "Choose a supported expiry option." }, 400);
      const target = new URL(body.url).toString();
      if (new URL(target).origin === url.origin) return json({ error: "Cannot shorten a CloudLink URL." }, 400);
      let key = alias;
      if (key) {
        if (await env.LINKS.get(key)) return json({ error: "That alias is already taken. Try another one." }, 409);
      } else {
        for (let i = 0; i < 4; i++) {
          key = crypto.randomUUID().replaceAll("-", "").slice(0, 7);
          if (!(await env.LINKS.get(key))) break;
          key = "";
        }
        if (!key) return json({ error: "Could not create a unique alias. Please retry." }, 503);
      }
      await env.LINKS.put(key, target, ttl ? { expirationTtl: ttl } : undefined);
      return json({ alias: key, shortUrl: `${url.origin}/${key}`, message: ttl ? "Link created; it will expire automatically." : "Link created; it has no expiry." }, 201);
    }
    if ((request.method === "GET" || request.method === "HEAD") && /^\/[a-zA-Z0-9-]{3,20}$/.test(url.pathname)) {
      const target = await env.LINKS.get(url.pathname.slice(1));
      if (!target) return new Response("Short link not found or expired", { status: 404 });
      return Response.redirect(target, 302);
    }
    return new Response("Not found", { status: 404 });
  },
};
