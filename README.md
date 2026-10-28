# Adım — Kendi hızında İngilizce

Yetişkin Türkçe konuşan öğrenciler için sade, etkileşimli İngilizce çalışma uygulaması. Kişisel kullanımla başlar; davet koduyla ayrı hesaplara açılabilir.

## Neler var?

- 12 soruluk başlangıç taraması: okuma, dinleme ve temel yapı için ayrı sonuçlar. Kesin CEFR sertifikasyonu değildir; konuşma/yazma seviyesi çıkarmaz.
- A1–A2 odaklı 8 özgün bölüm, 48 günlük kalıp, Türkçe açıklamalar, hikâyeler ve sorular.
- Öğren → hatırla → dinle/yaz → oku → sesli söyle akışı; bölüm içi ilerleme kaydı.
- Hatırlama durumuna göre 10 dakika–60 gün arasında tekrar planlama.
- Tarayıcı sesleriyle İngilizce dinleme ve yavaşlatma; cihazda ses kaydı ve tekrar dinleme.
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
- Dinleme için cihazda İngilizce bir ses gerekir. Ses bulunmazsa uygulama anlaşılır bir mesaj gösterir; dinleme soruları atlanabilir ve sonuçta belirtilir.
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
