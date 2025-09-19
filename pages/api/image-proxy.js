export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing url parameter" });
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).json({ error: `Failed to fetch ${url}` });
      return;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "image/png"
    );
    res.send(buffer);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: err.message });
  }
}
