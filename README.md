# Şimşek FC — Haftalık Ders Programı

Futbol kulübü havasında, tek sayfalık bir haftalık ders çalışma çizelgesi. Sol sütunda saatleri düzenlenebilir ders saatleri, her hücrede ders ve konu; haftalık hedefler, değerlendirme, Maç Saati (devreli odak sayacı) ve maç raporu grafikleri.

## Yayınlama (Vercel)

Derleme adımı yok; depo düz statik dosyalardan oluşur.

1. Vercel'de **Add New → Project** ile bu depoyu içe aktar.
2. Framework Preset: **Other**. Build Command ve Output Directory boş kalsın.
3. **Deploy**. Açılan adresi Chrome'da aç, menüden **Ana ekrana ekle / Uygulamayı yükle** ile tablete kur.

## Cihazlar arası eşitleme (e-posta + şifre)

1. Vercel → bu proje → **Storage** → **Upstash Redis** (ücretsiz). FORMA için kurduğun veritabanı varsa yenisini açmadan **Connect Project** ile onu bu projeye de bağlayabilirsin; anahtarlar `simsekfc:` önekiyle ayrı tutulur, FORMA'nın kaydına dokunulmaz.
2. Bağlayınca `KV_REST_API_URL` ve `KV_REST_API_TOKEN` kendiliğinden eklenir. **Deployments → Redeploy** ile yeniden yayınla.
3. Uygulamada üst şeritteki **Giriş yap · eşitle**'ye dokun, e-posta ve şifreni yaz. Her cihazda aynı e-posta ve şifreyle giriş yap; gerisi otomatik.

E-posta adresine mesaj gönderilmez, yalnızca hesabın adıdır. Şifre cihazdan çıkmaz; e-posta ve şifreden tarayıcıda bir hesap anahtarı (SHA-256) üretilir, sunucu yalnızca bu anahtarı görür. Şifre unutulursa buluttaki kayda ulaşılamaz.

Birleştirme hafta hafta yapılır: her hafta ve ayarlar için hangi cihazdaki daha yeniyse o kalır; silinen haftalar öbür cihazdan geri gelmez. Değişiklikler birkaç saniye içinde gönderilir; öbür cihaz uygulamayı açınca, ona geri dönünce ya da 45 saniyede bir kontrol ederek yenisini alır.

Giriş yapılmadıysa program yalnızca o tarayıcıda saklanır; **⋯ → Yedeği indir / Yedek yükle** ile elle taşınabilir. Teknik Direktör yalnızca Claude içinde açılan sürümde çalışır.

## Dosyalar

- `index.html` — uygulamanın tamamı
- `api/sync.js` — eşitleme sunucusu (Vercel fonksiyonu, Upstash Redis)
- `manifest.webmanifest`, `sw.js`, `icons/` — ana ekrana kurulum ve çevrimdışı açılış
