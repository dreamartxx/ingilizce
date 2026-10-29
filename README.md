# Adım — Kendi hızında İngilizce

Yetişkin Türkçe konuşan öğrenciler için sade, etkileşimli İngilizce çalışma uygulaması. Kişisel kullanımla başlar; davet koduyla ayrı hesaplara açılabilir.

## Neler var?

- A1–B2 için 24 soruluk seviye taraması; atlanan dinleme soruları ayrı sayılır.
- 32 konu: Türkçe anlatım, adım adım cümle kurma, 96 örnek ve 128 gramer sorusu.
- 1.518 kelime ve kullanım: genel bankada 44 başlık ve Muayene içinde 15 alt başlık. Genel konular: ev eşyaları, akrabalar, mutfak, ulaşım, iş hayatı, çevre, tartışma ve daha fazlası. Her kayıtta Türkçe anlam ve çevrilmiş örnek cümle.
- 9 sözcük türü için açıklama ve örnekler; zamir/sahiplik tablosu, sıfat karşılaştırmaları, 38 açıklamalı sözcük türü sorusu.
- Genel bankada 203 fiil: 122 düzenli, 81 düzensiz; Muayene bölümünde klinik örneklerle 45 fiil kullanımı daha. V1/V2/V3 tablosu; kabul edilen İngiliz/Amerikan biçimleri ve V2/V3 alıştırmaları.
- Genel bankada 2.662 kelime ve fiil alıştırması: 1.153 anlamdan hatırlama, 1.103 cümle tamamlama ve 406 fiil çekimi sorusu. Seçenekli veya yazarak 10/20 soruluk turlar.
- Konu/seviye/sözcük türü ve fiil çekimiyle arama; grup hâlinde kart ekleme, favoriler, filtreli kart çalışması. Az çalışılan sorulara öncelik verilir.
- 32 özgün okuma metni, 64 okuma sorusu, 32 dinleme sorusu, 32 konuşma/yazma görevi.
- Yanlışlar otomatik birikir; beceri/seviye filtreli ayrı çalışma ve üç farklı günde doğru hatırlama takibi.
- Dört ImageGen atlasında 16 özgün ders sahnesi; kelime bankasında tematik simgeler ve renklerle bölümleme.
- İlk sürümün 8 bölümü ve 48 kalıbı ile mevcut kayıtlar korunur.
- Kart tekrarları 10 dakika–60 gün; aynı oturumda kartların tekrar dönmesi engellenir.
- Kelime bankasındaki 1.518 kelime/kullanımın tamamında kelime sesi; Muayene bölümündeki bütün örnekler ve 8 görüşmenin tüm satırlarında normal/yavaş dinleme. Genel bankanın henüz kaydı olmayan örnekleri yazılı çalışılır.
- Önceki müfredattaki 636 metin için ElevenLabs kayıtları: kelimeler, örnekler, hikâyeler, rehberli diyaloglar ve Türkçe konu anlatımları. Normal/yavaş dinleme ve durdurma desteklenir.
- 3 rehberli konuşma sahnesi ve API bağlandığında yazılı yapay zekâ öğretmeni.
- Seviyeye göre başlangıç bölümü önerisi; kişisel ilerleme, günlük hedef ve notlar.
- British Council video, dinleme ve okuma kütüphanesi; bağlantılar kaynağın kendi sitesinde açılır.
- Mobil arayüz, büyütülebilir metin, klavye erişimi ve hareket azaltma tercihi.
- E-posta/şifre girişi, davetli kayıt, şifre değiştirme, MySQL kayıtları ve JSON dışa aktarma.

Kelime sesleri ve Muayene örnekleri ElevenLabs kayıtlarıyla genişletilir. Önceden kaydedilen sesler korunur; kartlar yalnızca kaydı bulunan kelime ve örnekler için ses düğmesi gösterir. Kelime sayısı farklı sözcük türlerindeki kullanımları ayrı sayar, fiil çekimlerini ek kelime saymaz. A1–B2 etiketleri yaklaşık çalışma sırasıdır.

## Muayene

Kelime bankasının ilk kategorisi. 365 klinik kelime/kullanım: 15 alt başlık; 45 çekimli fiil; doktor için 40, hasta için 25 hazır cümle. 755 kelime/çekim alıştırması ve 8 kurgusal doktor–hasta görüşmesinde 16 anlama sorusu. Doktorun İngilizce cümlelerini gizleyerek hatırlama, Türkçeyi açma/kapama ve görüşme bazında çalışma desteklenir.

Alt başlıklar: iletişim, öykü, ağrı nitelikleri, genel belirtiler/cilt, solunum/kalp, sindirim, idrar/üreme/kadın sağlığı, nöroloji/duyu/ruhsal durum, anatomi, fizik muayene/araçlar, tetkikler, tedavi/takip, doktor cümleleri, hasta ifadeleri ve fiiller. Klinik kullanımlar ayrı kimliklerle korunur; günlük dildeki aynı sözcüğün kartı veya kaydı değiştirilmez. ECG/EKG/CBC gibi kısaltmalar ve diarrhea gibi yazım varyantları aramada ve kelime yanıtlarında kabul edilir.

İçerik mesleki dil çalışmasıdır, tanı/tedavi protokolü değildir. Hasta verisi kullanılmaz. Ses/API üretimi yapılmadı. Özgün örneklerde terminoloji ve iletişim kontrolü için [NHS](https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/), [MedlinePlus terimleri](https://medlineplus.gov/appendixa.html) ve [tetkik rehberi](https://medlineplus.gov/lab-tests/) kullanıldı; kaynaklar bölüm içinde de açılabilir.

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

React + Vite istemci, Express 5 Node.js sunucu, `mysql2` ile MySQL. Tek Node süreci derlenmiş arayüzü ve `/api` uçlarını sunar. Ayrı frontend hosting gerekmez. Veri tabloları ilk bağlantıda oluşturulur; mevcut veriler silinmez. Sürüm kontrolü eski sekmenin yeni ilerlemeyi ezmesini önler. Büyüyen kelime ve yanlış kayıtları için JSON gövde sınırı 4 MiB; kimlik ve alan doğrulaması korunur.

## Yapay zekâ

Sunucuda `AI_API_KEY`, `AI_MODEL` ve isteğe bağlı `AI_BASE_URL` ayarlayın. Varsayılan adres OpenAI Chat Completions API'sidir. Uyumlu başka servislerde `max_completion_tokens` desteğini doğrulayın. Model adı sağlayıcınızın hesabında erişilebilir olmalıdır; sabit model varsayılmaz.

İstek başına en fazla 12 mesaj / mesaj başına 1.500 karakter gönderilir. Sunucu kullanıcı başına dakika sınırı ve MySQL'de günlük kota uygular. Varsayılan günlük üst sınır 40 istektir (`AI_DAILY_LIMIT`). Sağlayıcıya yapılan hatalı istekler de kotadan sayılır. Sağlayıcı hesabınızın faturalandırma limitini ayrıca ayarlayın.

API anahtarı tarayıcıya veya GitHub'a gönderilmez. Yapay zekâ yalnızca yazıyla çalışır; ses analizi/telaffuz puanlama yapmaz. Rehberli mod yapay zekâ değildir; hazır cümleler ve basit anahtar kelime kontrolü kullanır. Yapay zekâ yanıtları yanlış olabilir.

## Gizlilik ve sınırlar

- Ses kaydı sunucuya yüklenmez. “Konuşarak yaz” isteğe bağlı Web Speech özelliğidir; tarayıcı sağlayıcısının uzaktaki ses hizmetini kullanabilir.
- Sesler statik MP3 kayıtlarıdır; her dinlemede ElevenLabs isteği veya kredi tüketimi olmaz. Dinleme soruları gerektiğinde atlanabilir. Cihaz sentez sesi kullanılmaz.
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

## ElevenLabs kayıtları

Toplam 2.271 metin kaydı: korunmuş 636 müfredat kaydı, 705 yeni Muayene kaydı ve 930 yeni genel kelime kaydı. ElevenLabs’in açık web hesabında üretildi; API anahtarı oluşturulmadı. İngilizce kayıtlar Max - Elearning and Documentary, Türkçe kayıtlar Seyfullah Kartal sesiyle, Eleven Multilingual v2 modeliyle hazırlandı. Üretilen MP3 dosyaları statik olarak sunulur; uygulama kullanılırken ElevenLabs kredisi harcanmaz.

`node scripts/index-narration.mjs`, sevkiyata hazır ses manifestinden arayüzün kayıt dizinini üretir; manifest değiştiğinde çalıştırılır. Kelime, örnek ve diyalog satırlarının ses uygunluğu ayrı ayrı kontrol edilir.

`public/audio/manifest.json` her özgün metni bir MP3 dosyası ve başlangıç/bitiş saniyesiyle eşler. Dosyalar en fazla yaklaşık üç dakikalık paketlerdir; oynatıcı yalnızca seçilen parçayı çalar. Paketler arasında sessiz pay bulunur. Seslerin metin kapsamı, dosya varlığı ve zaman aralıkları otomatik test edilir. Her kaydın insan tarafından baştan sona dinlendiği iddia edilmez.

Kullanıcının kredi tasarrufu isteğiyle önceden üretilmiş kayıtlar yeniden üretilmedi. İlk Türkçe kayıtların bazılarında eğik çizgi gibi işaretler okunabilir. Sonraki üretimlerde formüller doğal konuşmaya çevrildi: örneğin “had + V3” yerine “had sözcüğünün ardından fiilin üçüncü biçimi”. Bu ayrım ekrandaki ders metnini değiştirmez.

`node scripts/generate-narration.mjs` yalnızca eksik kayıt sayısını gösteren isteğe bağlı bakım aracıdır. Mevcut kayıtları yeniden üretmez; web hesabıyla yapılan bu çalışma için çalıştırılmasına veya API anahtarına gerek yoktur. Yeni içerik üretilecekse önce seslendirme metni hazırlanmalı, gösterim amaçlı işaretler doğrudan okutulmamalıdır. Bu genişlemenin özgün metin → konuşma metni eşlemesi `docs/narration-english-script.json` içindedir. İngilizce dil ayarı sabitlenir; Türkçe fonetik yazım kullanılmaz. Tireler boşluğa, Dr unvanı Doctor sözcüğüne çevrilir; normal cümle noktalaması duraklama için korunur. Uzun erken paketlerde hızlı çıkan 175 parça yeniden üretilmeden, perdeyi koruyan yerel hız ayarıyla yavaşlatılmıştır. Yapay zekânın serbest sohbet yanıtları bu statik ses kataloğuna dahil değildir.

Bu müfredat A1–B2 yapılarından seçilmiş bir çalışma rotasıdır; kapsamlı bir dil okulunun tüm kelime havuzu veya CEFR belgelendirmesi değildir. Yazma/konuşmada kayıt ve öz değerlendirme vardır; otomatik değerlendirme olduğu iddia edilmez.
