# Şimşek FC — Haftalık Ders Programı

Futbol kulübü havasında, tek sayfalık bir haftalık ders çalışma çizelgesi. Sol sütunda saatleri düzenlenebilir ders saatleri, her hücrede ders ve konu; haftalık hedefler, değerlendirme, Maç Saati (devreli odak sayacı) ve maç raporu grafikleri.

## Yayınlama (Vercel)

Derleme adımı yok; depo düz statik dosyalardan oluşur.

1. Vercel'de **Add New → Project** ile bu depoyu içe aktar.
2. Framework Preset: **Other**. Build Command ve Output Directory boş kalsın.
3. **Deploy**. Açılan adresi Chrome'da aç, menüden **Ana ekrana ekle / Uygulamayı yükle** ile tablete kur.

## Veri

Bu sürümde program tarayıcının yerel deposunda saklanır (cihaz başına). Cihaz değiştirirken **⋯ → Yedeği indir** ile JSON yedek alıp diğer cihazda **Yedek yükle** ile geri yükle.
Claude içinde açılan sürümde bulut eşitlemesi ve Teknik Direktör de çalışır; bu iki özellik burada kapalıdır.

## Dosyalar

- `index.html` — uygulamanın tamamı
- `manifest.webmanifest`, `sw.js`, `icons/` — ana ekrana kurulum ve çevrimdışı açılış
