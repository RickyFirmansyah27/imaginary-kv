export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/get") {
      const data = await env.SESSION_KV.get("relay_cookies");
      return new Response(data || "{}", { headers: { "content-type": "application/json" } });
    }

    if (url.pathname === "/set") {
      const body = await request.text();
      await env.SESSION_KV.put("relay_cookies", body);
      return new Response("✅ Saved cookies to KV");
    }

    if (url.pathname === "/clear") {
      await env.SESSION_KV.delete("relay_cookies");
      return new Response("🧹 KV cookies cleared");
    }

    return new Response("Relay KV Worker OK ✅");
  },
};
