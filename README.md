# Adım — Kendi hızında İngilizce

Yetişkin Türkçe konuşan öğrenciler için sade, etkileşimli İngilizce çalışma uygulaması. Kişisel kullanımla başlar; davet koduyla ayrı hesaplara açılabilir.

## Neler var?

- A1–B2 için 24 soruluk seviye taraması; atlanan dinleme soruları ayrı sayılır.
- 32 konu: Türkçe anlatım, adım adım cümle kurma, 96 örnek ve 128 gramer sorusu.
- 192 kelime/ifade: arama, seviye/konu filtresi, favoriler, kişisel kart kutusu, yazılı hatırlama.
- 32 özgün okuma metni, 64 okuma sorusu, 32 dinleme sorusu, 32 konuşma/yazma görevi.
- Yanlışlar otomatik birikir; beceri/seviye filtreli ayrı çalışma ve üç farklı günde doğru hatırlama takibi.
- Dört ImageGen atlasında 16 özgün sahne; konu ve kartlarda görsel bağlam.
- İlk sürümün 8 bölümü ve 48 kalıbı ile mevcut kayıtlar korunur.
- Kart tekrarları 10 dakika–60 gün; aynı oturumda kartların tekrar dönmesi engellenir.
- ElevenLabs statik MP3 desteği hazır. Kayıtlar henüz üretilmemişse bu açıkça belirtilir; kullanıcı isterse geçici cihaz sesini seçebilir.
- 3 rehberli konuşma sahnesi ve API bağlandığında yazılı yapay zekâ öğretmeni.
- Seviyeye göre başlangıç bölümü önerisi; kişisel ilerleme, günlük hedef ve notlar.
- British Council video, dinleme ve okuma kütüphanesi; bağlantılar kaynağın kendi sitesinde açılır.
- Mobil arayüz, büyütülebilir metin, klavye erişimi ve hareket azaltma tercihi.
- E-posta/şifre girişi, davetli kayıt, şifre değiştirme, MySQL kayıtları ve JSON dışa aktarma.

## Hızlı başlat

Node.js **22.12+** (Hostinger'da **22.x** seçin).

```sh
npm ci
npm run build
npm start
```

`http://localhost:3000` açılır. `PORT` Hostinger tarafından atanabilir. Veritabanı ayarlanmadan uygulama açıkça etiketlenmiş **deneme alanı** olarak çalışır; kayıt yalnızca tarayıcıdadır. Deneme kaydı hesaba otomatik aktarılmaz.

Geliştirme için `dist/` yokken `npm run dev` Vite middleware kullanır. Derlenmiş `dist/` varsa sunucu onu kullanır. Değişiklik sonrası `npm run build` yapın.

**Hostinger için adımlar: [HOSTINGER.md](HOSTINGER.md)**

## Teknoloji

React + Vite istemci, Express 5 Node.js sunucu, `mysql2` ile MySQL. Tek Node süreci derlenmiş arayüzü ve `/api` uçlarını sunar. Ayrı frontend hosting gerekmez. Veri tabloları ilk bağlantıda oluşturulur; mevcut veriler silinmez. Sürüm kontrolü eski sekmenin yeni ilerlemeyi ezmesini önler.

## Yapay zekâ

Sunucuda `AI_API_KEY`, `AI_MODEL` ve isteğe bağlı `AI_BASE_URL` ayarlayın. Varsayılan adres OpenAI Chat Completions API'sidir. Uyumlu başka servislerde `max_completion_tokens` desteğini doğrulayın. Model adı sağlayıcınızın hesabında erişilebilir olmalıdır; sabit model varsayılmaz.

İstek başına en fazla 12 mesaj / mesaj başına 1.500 karakter gönderilir. Sunucu kullanıcı başına dakika sınırı ve MySQL'de günlük kota uygular. Varsayılan günlük üst sınır 40 istektir (`AI_DAILY_LIMIT`). Sağlayıcıya yapılan hatalı istekler de kotadan sayılır. Sağlayıcı hesabınızın faturalandırma limitini ayrıca ayarlayın.

API anahtarı tarayıcıya veya GitHub'a gönderilmez. Yapay zekâ yalnızca yazıyla çalışır; ses analizi/telaffuz puanlama yapmaz. Rehberli mod yapay zekâ değildir; hazır cümleler ve basit anahtar kelime kontrolü kullanır. Yapay zekâ yanıtları yanlış olabilir.

## Gizlilik ve sınırlar

- Ses kaydı sunucuya yüklenmez. “Konuşarak yaz” isteğe bağlı Web Speech özelliğidir; tarayıcı sağlayıcısının uzaktaki ses hizmetini kullanabilir.
- ElevenLabs kaydı olmayan metinler eksik olarak işaretlenir. Geçici cihaz sesi isteğe bağlıdır; dinleme soruları atlanabilir.
- Mikrofon üretimde HTTPS gerektirir. Web Speech desteği tarayıcıya göre değişir; yazıyla devam her zaman mümkündür.
- Hesaplar veritabanında ayrı tutulur. Parolalar rastgele salt + scrypt ile saklanır; oturum tokenlarının yalnızca SHA-256 özetleri veritabanına yazılır. Çerezler HttpOnly, SameSite=Strict ve üretimde Secure'dur.
- Davet kodu ayarlanmadıkça yeni üyelik kapalıdır. Bu sürümde e-posta doğrulama, otomatik e-posta ile şifre kurtarma, ödeme veya yönetici paneli yoktur.
- Kayıt/çıkış sırasında hata görünür tutulur. Çakışmada Ayarlar'dan ilerlemeyi dışa aktarın, sonra sayfayı yenileyin.
- Herkese açık büyüme öncesinde e-posta doğrulama/kurtarma, kayıt kötüye kullanım kontrolleri, veri silme akışı ve sağlayıcıların gerçek yük altında sınırları eklenmelidir.

## Test

```sh
npm test
npm run build
```

Birim/API testleri; erişim, kullanıcı izolasyonu, CSRF kaynak kontrolü, şifre değişimi, oturum iptali, kota, tekrar planlaması ve seviye önerisini kapsar. MySQL testi normal yerel koşuda atlanır; GitHub Actions'ta ayrı `adim_test` veritabanı ve MySQL 8.4 üzerinde çalışır. Gerçek AI/mikrofon, sağlayıcı ve cihaz erişimi olmadan uçtan uca doğrulanamaz.

## Kaynaklar

Ders metinleri ve çizim uygulama için özgün hazırlanmıştır. Haricî içerikler kopyalanmaz; yalnızca bağlantı verilir.

- [Hostinger Node.js yayınlama](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Hostinger MySQL bağlantısı](https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/)
- [OpenAI Chat Completions API](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)
- [British Council Starting Out](https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out)

## ElevenLabs ses üretimi

`node scripts/generate-narration.mjs` yalnızca planı gösterir. Şu an 636 metin / yaklaşık 31 bin karakter vardır. Anahtar kaynakta, manifestte veya istemcide bulunmaz. Üretim için mevcut anahtarı yalnızca özel bir yerel dosyadan okuyun:

```sh
node scripts/generate-narration.mjs --generate --key-file /private/path/elevenlabs-key.txt --voice EXISTING_VOICE_ID --limit 3
```

İlk üç kaydı dinleyip sesi doğrulayın; sonra `--limit` kaldırılarak devam edilebilir. Araç mevcut manifesti korur, yalnızca eksikleri üretir ve krediler yetmiyorsa durur. Satın alma veya plan yükseltmez. `public/audio/` MP3 dosyaları ve manifest yayımlanır. Boş manifest tamamlanmış ses üretimi anlamına gelmez. Türkçe ve İngilizce için `eleven_multilingual_v2` kullanılır.

Bu müfredat A1–B2 yapılarından seçilmiş bir çalışma rotasıdır; kapsamlı bir dil okulunun tüm kelime havuzu veya CEFR belgelendirmesi değildir. Yazma/konuşmada kayıt ve öz değerlendirme vardır; otomatik değerlendirme olduğu iddia edilmez.
