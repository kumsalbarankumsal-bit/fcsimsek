/* Şimşek FC cihazlar arası eşitleme.
   Kayıt, e-posta + şifreden tarayıcıda türetilen hesap anahtarına bağlı olarak Upstash Redis'te tutulur.
   Vercel → proje → Storage → Upstash Redis bağlanınca KV_REST_API_URL / KV_REST_API_TOKEN kendiliğinden gelir.
   GET  /api/sync?k=ANAHTAR&meta=1 → { t }
   GET  /api/sync?k=ANAHTAR        → { t, v }
   PUT  /api/sync { k, t, base, v }  → { ok, t }   (sunucudaki kayıt base'den yeniyse 409 { t }) */
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const P = 'simsekfc:';

async function redis(cmd) {
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOK}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
const okKey = k => typeof k === 'string' && /^[a-f0-9]{40}$/.test(k);

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!URL_ || !TOK) return res.status(503).json({ hata: 'Eşitleme deposu bağlı değil (Vercel → Storage → Upstash Redis).' });
  try {
    if (req.method === 'GET') {
      const k = req.query.k;
      if (!okKey(k)) return res.status(400).json({ hata: 'anahtar' });
      if (req.query.meta) return res.json({ t: Number(await redis(['GET', P + 't:' + k])) || 0 });
      const raw = await redis(['GET', P + 'v:' + k]);
      return res.json(raw ? JSON.parse(raw) : { t: 0 });
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      let b = req.body;
      if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
      b = b || {};
      const t = Number(b.t), base = Number(b.base) || 0;
      if (!okKey(b.k) || typeof b.v !== 'string' || !(t > 0) || b.v.length > 3000000) return res.status(400).json({ hata: 'istek' });
      const cur = Number(await redis(['GET', P + 't:' + b.k])) || 0;
      if (cur > base) return res.status(409).json({ hata: 'daha yeni kayıt var', t: cur });
      await redis(['MSET', P + 'v:' + b.k, JSON.stringify({ t, v: b.v }), P + 't:' + b.k, String(t)]);
      return res.json({ ok: true, t });
    }
    res.setHeader('Allow', 'GET, PUT, POST');
    return res.status(405).json({ hata: 'yöntem' });
  } catch (e) {
    return res.status(500).json({ hata: String((e && e.message) || e) });
  }
};
