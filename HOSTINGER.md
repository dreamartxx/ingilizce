# Hostinger Business kurulumu

## 1. GitHub reposunu bağla

Hostinger → Websites / Web siteleri → Add website / Web sitesi ekle → Node.js Web App → GitHub.

- Repo: `dreamartxx/ingilizce`
- Branch: `main`
- Proje kökü: `/` (repo kökü)
- Framework / tür: **Express**. Algılama Vite gösterirse sunucu çalıştıran Express / Other seçeneğini kullan; yalnızca statik frontend olarak yayınlama.
- Node.js: **22.x** (en az 22.12)
- Paket yöneticisi: npm
- Yükleme komutu istenirse: `npm ci`
- Build command / derleme alanı varsa: `npm run build`. Express ekranında bu alan görünmezse sorun değil; `postinstall` bağımlılık kurulumundan sonra arayüzü otomatik derler.
- Start command / başlatma: `npm start`
- Entry file / giriş dosyası istenirse: `server/index.js`
- Output directory / çıktı klasörü istenirse: `dist`
- Port: Hostinger'ın verdiği `PORT` otomatik kullanılır; sabit port girmek gerekmez.

Panel alanları farklı sırada görünebilir. Önce geçici alan adıyla yayınlayabilirsin. İlk yayında dersler deneme alanında açılır. Henüz veritabanı/API değerlerin yoksa otomatik bulunan boş satırları sağdaki × ile kaldır; yalnızca `NODE_ENV=production` ve gerçek geçici alan adına uygun `APP_ORIGIN` değerini ekleyerek devam et. Diğer değerleri yayın sonrasında ekleyebilirsin. Hesapların ve yapay zekânın çalışması için aşağıdaki ortam değişkenleri gerekir.

## 2. Kalıcı veritabanını oluştur

Hostinger → site yönetimi → Databases / Veritabanları → Management.

Bir MySQL veritabanı ve ona ait kullanıcı oluştur. Başındaki Hostinger ön eki dahil **tam** veritabanı/kullanıcı adlarını kullan.

Uygulamanın **Environment variables / Ortam değişkenleri** alanına ekle:

| Değişken | Değer |
|---|---|
| `NODE_ENV` | `production` |
| `APP_ORIGIN` | Uygulamanın tam HTTPS adresi, sonunda `/` olmadan. Örnek: `https://ingilizce.example.com` |
| `DB_HOST` | `127.0.0.1` |
| `DB_PORT` | `3306` |
| `DB_NAME` | Hostinger'daki tam veritabanı adı |
| `DB_USER` | Hostinger'daki tam kullanıcı adı |
| `DB_PASSWORD` | Veritabanı şifresi |
| `OWNER_NAME` | Ekranda görmek istediğin ad |
| `OWNER_EMAIL` | Giriş yapacağın e-posta |
| `OWNER_PASSWORD` | En az 12 karakterli, güçlü ve yalnızca bu sitede kullanacağın ilk şifre |

Kaydet ve uygulamayı yeniden başlat / yeniden deploy et. Uygulama tabloları ve ilk hesabı oluşturur. Giriş yaptıktan sonra `OWNER_PASSWORD` değişkenini kaldırabilirsin. Aynı e-posta zaten varsa uygulama şifreyi kendiliğinden değiştirmez.

Geçici alan adından kendi alan adına geçtiğinde `APP_ORIGIN` değerini de güncelle ve yeniden başlat. `www` kullanıyorsan adres onunla tam olarak eşleşmeli; diğer adresi asıl adrese yönlendir. Yanlış adres, yazma isteklerinde kaynak doğrulama hatası verir.

> Hostinger Node.js için MySQL adresinde `localhost` yerine `127.0.0.1` kullanılmasını önerir.

## 3. Yapay zekâ öğretmenini bağla

| Değişken | Değer |
|---|---|
| `AI_BASE_URL` | OpenAI için `https://api.openai.com/v1`; başka uyumlu sağlayıcıda onun `/v1` adresi |
| `AI_API_KEY` | Sağlayıcının gizli API anahtarı |
| `AI_MODEL` | Sağlayıcıda erişimin olan modelin tam adı |
| `AI_DAILY_LIMIT` | İsteğe bağlı, varsayılan `40` istek / kullanıcı / gün |

Üç bağlantı değerini ayarla, yeniden başlat. Hesabına giriş yap → Konuşma odası → Pratik türü → Yapay zekâ öğretmeni.

API anahtarını GitHub dosyalarına, tarayıcı koduna veya sohbet ekranına yazma. Panelin ortam değişkenlerinde tut. Sağlayıcı hesabında ayrıca harcama sınırı belirle. ChatGPT aboneliği API bakiyesi yerine geçmez.

Bağlantıyı test etmek için “Hello, I am learning English.” yaz. Yanıt gelmiyorsa model adı, anahtar, bakiye, adres ve sağlayıcının Chat Completions / `max_completion_tokens` desteğini kontrol et. Uygulama sağlayıcı hata ayrıntıları veya anahtarını kullanıcıya göstermez.

## 4. Son kontrol

1. HTTPS adresinden aç; hesabına giriş yap.
2. İlk bölümü tamamla. Tekrar kutusunda 6 ifade görünmeli.
3. Çıkış yapıp tekrar gir; tamamlanan bölüm durmalı.
4. İkinci cihazda aynı hesapla giriş yap; kayıtlar görünmeli.
5. Ses kontrolünü çalıştır. Cihazda İngilizce ses yoksa işletim sistemi konuşma ayarlarından ekle.
6. Mikrofon izni vererek kısa kayıt al, durdur, dinle.
7. Yapay zekâ bağlandıysa bir mesaj gönder.

## Daha sonra başkalarına açmak

`REGISTRATION_CODE` ortam değişkenine güçlü bir davet kodu yaz. Giriş penceresinde davetli kayıt açılır. Her kullanıcı kendi ilerlemesini görür. Kodu kaldırınca yeni kayıt kapanır; mevcut hesaplar devam eder. İlk aşamada davetli kullanım tercih edilmiştir; sınırsız herkese açık kayıt ve e-posta ile şifre kurtarma henüz uygulanmamıştır.

## Sahip şifresini kurtarma

Sunucu terminaline erişimin varsa `OWNER_EMAIL` ve yeni `OWNER_PASSWORD` ortam değişkenlerini ayarla; sonra:

```sh
node server/reset-owner.js
```

Komut mevcut kullanıcıyı bulur, parolayı hashleyerek günceller ve o kullanıcının tüm oturumlarını kapatır. İşlemden sonra `OWNER_PASSWORD` değişkenini kaldır. Komut yeni kullanıcı oluşturmaz; parolayı ekrana yazmaz.

## Yedekleme

Hostinger MySQL yedeklerini etkin tut. Kodun yeniden yayınlanması MySQL verisini silmez. Uygulamadaki **Ayarlarım → İlerlememi dışa aktar** kişisel JSON kopyası verir; bu dosya otomatik geri yükleme veya tüm veritabanı yedeği değildir.

## Yaygın durumlar

- **Deneme alanı açılıyor, hesap yok:** MySQL değişkenleri ve `APP_ORIGIN` tamamlanmamış olabilir.
- **Uygulama başlamıyor:** Build ve runtime loglarını kontrol et. MySQL kullanıcı yetkileri ve ilk şifre uzunluğu doğru olmalı.
- **Girişten sonra yine giriş isteniyor:** HTTPS ve gerçek uygulama adresini kullan; çerezleri engelleyen ayarları kontrol et.
- **Kaynak doğrulama hatası:** `APP_ORIGIN` tarayıcı adresiyle tam eşleşmeli, sonunda `/` olmamalı.
- **Başka sekmede değişti uyarısı:** Mevcut veriyi dışa aktar, sonra yenile. Aynı hesap üzerinde paralel sekmelerde çalışma.
- **Ses yok:** İngilizce cihaz sesi bulunmayabilir. Başka tarayıcı/cihaz dene; uygulama yazılı öğrenmeye izin verir.

Doğrulanan resmî bilgiler: 28 Ekim 2026. [Hostinger Node.js rehberi](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/) · [MySQL rehberi](https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/)
