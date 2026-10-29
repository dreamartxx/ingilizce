import {enrichWords} from './vocabulary/data.js';
import {grammar} from './grammar.js';
// Each block follows the corresponding topic; each entry includes an original usage example.
const blocks = [
`name|isim|My name is Deniz.|Benim adım Deniz.
friend|arkadaş|She is my friend.|O benim arkadaşım.
teacher|öğretmen|My father is a teacher.|Babam öğretmen.
ready|hazır|Are you ready?|Hazır mısın?
tired|yorgun|I am tired today.|Bugün yorgunum.
from|bir yerden|I am from Turkey.|Ben Türkiyeliyim.`,
`cup|fincan|This is a cup of tea.|Bu bir fincan çay.
apple|elma|I have an apple.|Bir elmam var.
umbrella|şemsiye|Take an umbrella.|Bir şemsiye al.
water|su|I need some water.|Biraz suya ihtiyacım var.
menu|menü|Can I see the menu?|Menüyü görebilir miyim?
bill|hesap|The bill is on the table.|Hesap masanın üstünde.`,
`family|aile|My family is here.|Ailem burada.
daughter|kız evlat|Their daughter is a student.|Kızları öğrenci.
son|erkek evlat|Our son is ten.|Oğlumuz on yaşında.
parents|anne ve baba|My parents live nearby.|Annem ve babam yakında yaşıyor.
keys|anahtarlar|These are my keys.|Bunlar anahtarlarım.
bag|çanta|Her bag is blue.|Onun çantası mavi.`,
`usually|genellikle|I usually walk to work.|İşe genellikle yürürüm.
breakfast|kahvaltı|She has breakfast at seven.|Yedide kahvaltı yapar.
wake up|uyanmak|I wake up early.|Erken uyanırım.
evening|akşam|We read in the evening.|Akşamları okuruz.
every day|her gün|I practise every day.|Her gün pratik yaparım.
before|önce|I read before bed.|Yatmadan önce okurum.`,
`where|nerede|Where is the station?|İstasyon nerede?
when|ne zaman|When does the film start?|Film ne zaman başlıyor?
why|neden|Why are you here?|Neden buradasın?
how much|ne kadar|How much is this book?|Bu kitap ne kadar?
address|adres|What is your address?|Adresiniz nedir?
station|istasyon|The station opens early.|İstasyon erken açılır.`,
`room|oda|There are two rooms.|İki oda var.
table|masa|The book is on the table.|Kitap masanın üstünde.
chair|sandalye|There is a chair here.|Burada bir sandalye var.
window|pencere|The window is open.|Pencere açık.
under|altında|The bag is under the chair.|Çanta sandalyenin altında.
next to|yanında|The lamp is next to the bed.|Lamba yatağın yanında.`,
`help|yardım etmek|Can you help me?|Bana yardım edebilir misin?
swim|yüzmek|I can swim.|Yüzebilirim.
cook|yemek yapmak|He can cook very well.|Çok iyi yemek yapabilir.
drive|araç kullanmak|She cannot drive.|Araç kullanamaz.
slowly|yavaşça|Please speak slowly.|Lütfen yavaş konuş.
please|lütfen|Please sit here.|Lütfen buraya otur.`,
`now|şimdi|I am reading now.|Şimdi okuyorum.
wait|beklemek|We are waiting outside.|Dışarıda bekliyoruz.
rain|yağmur yağmak|It is raining.|Yağmur yağıyor.
listen|dinlemek|I am listening to music.|Müzik dinliyorum.
read|okumak|She is reading a story.|Bir hikâye okuyor.
outside|dışarıda|They are playing outside.|Dışarıda oynuyorlar.`,
`yesterday|dün|I called you yesterday.|Dün seni aradım.
visit|ziyaret etmek|We visited a museum.|Bir müze gezdik.
buy|satın almak|I bought a coat.|Bir palto aldım.
journey|yolculuk|The journey was short.|Yolculuk kısaydı.
arrive|varmak|We arrived at nine.|Dokuzda vardık.
last week|geçen hafta|I saw her last week.|Onu geçen hafta gördüm.`,
`while|iken|I listened while she spoke.|O konuşurken dinledim.
suddenly|aniden|Suddenly, the phone rang.|Telefon aniden çaldı.
ring|çalmak (telefon)|My phone was ringing.|Telefonum çalıyordu.
notice|fark etmek|I noticed a small shop.|Küçük bir dükkân fark ettim.
carry|taşımak|She was carrying a bag.|Bir çanta taşıyordu.
through|içinden|We walked through the park.|Parkın içinden yürüdük.`,
`plan|plan|We have a plan.|Bir planımız var.
tomorrow|yarın|I will call tomorrow.|Yarın arayacağım.
book|rezervasyon yapmak|I am going to book a room.|Oda ayırtacağım.
flight|uçuş|Our flight leaves at six.|Uçuşumuz altıda kalkıyor.
pack|bavul hazırlamak|I need to pack my bag.|Bavulumu hazırlamam gerekiyor.
soon|yakında|We will meet soon.|Yakında buluşacağız.`,
`cheaper|daha ucuz|This ticket is cheaper.|Bu bilet daha ucuz.
comfortable|rahat|This seat is comfortable.|Bu koltuk rahat.
crowded|kalabalık|The train is crowded.|Tren kalabalık.
faster|daha hızlı|This train is faster.|Bu tren daha hızlı.
choice|seçim|It is a good choice.|Bu iyi bir seçim.
price|fiyat|The price is lower today.|Fiyat bugün daha düşük.`,
`rice|pirinç|We need some rice.|Biraz pirince ihtiyacımız var.
amount|miktar|Use a small amount.|Az bir miktar kullan.
enough|yeterli|We have enough food.|Yeterli yiyeceğimiz var.
few|az sayıda|There are a few apples.|Birkaç elma var.
little|az miktarda|Add a little milk.|Biraz süt ekle.
shopping list|alışveriş listesi|I wrote a shopping list.|Bir alışveriş listesi yazdım.`,
`rule|kural|Read the rules first.|Önce kuralları oku.
allowed|izin verilen|Parking is not allowed.|Park etmek yasak.
necessary|gerekli|Is a ticket necessary?|Bilet gerekli mi?
advice|tavsiye|Thank you for your advice.|Tavsiyen için teşekkürler.
break|mola|You should take a break.|Mola versen iyi olur.
seat belt|emniyet kemeri|Wear your seat belt.|Emniyet kemerini tak.`,
`experience|deneyim|It was a useful experience.|Faydalı bir deneyimdi.
already|çoktan|I have already eaten.|Çoktan yemek yedim.
yet|henüz|We have not finished yet.|Henüz bitirmedik.
ever|hiç (soruda)|Have you ever been here?|Hiç burada bulundun mu?
try|denemek|I have tried this dish.|Bu yemeği denedim.
abroad|yurt dışında|She has worked abroad.|Yurt dışında çalıştı.`,
`enjoy|keyif almak|I enjoy reading.|Okumaktan keyif alırım.
decide|karar vermek|We decided to stay.|Kalmaya karar verdik.
avoid|kaçınmak|Try to avoid noise.|Gürültüden kaçınmaya çalış.
hobby|hobi|Painting is my hobby.|Resim yapmak hobim.
improve|geliştirmek|I want to improve my English.|İngilizcemi geliştirmek istiyorum.
practise|pratik yapmak|I practise speaking daily.|Her gün konuşma pratiği yaparım.`,
`since|bir zamandan beri|I have lived here since May.|Mayıstan beri burada yaşıyorum.
recently|son zamanlarda|I have been busy recently.|Son zamanlarda yoğundum.
progress|ilerleme|You are making progress.|İlerleme kaydediyorsun.
effort|çaba|Learning takes effort.|Öğrenmek çaba gerektirir.
regularly|düzenli olarak|She practises regularly.|Düzenli pratik yapar.
achieve|başarmak|We can achieve our goal.|Hedefimize ulaşabiliriz.`,
`realise|farkına varmak|I realised I had lost my key.|Anahtarımı kaybettiğimi fark ettim.
by the time|olduğunda / olana kadar|By the time I arrived, it was dark.|Vardığımda hava karanlıktı.
previously|daha önce|We had met previously.|Daha önce tanışmıştık.
fortunately|neyse ki|Fortunately, nobody was hurt.|Neyse ki kimse incinmedi.
manage|başarmak / üstesinden gelmek|I managed to catch the bus.|Otobüse yetişmeyi başardım.
eventually|sonunda|Eventually, we found the hotel.|Sonunda oteli bulduk.`,
`unless|olmazsa / -medikçe|We will walk unless it rains.|Yağmur yağmazsa yürüyeceğiz.
result|sonuç|The result depends on you.|Sonuç sana bağlı.
prepare|hazırlamak|I will prepare dinner.|Akşam yemeğini hazırlayacağım.
depend on|bağlı olmak|It depends on the weather.|Havaya bağlı.
likely|muhtemel|Rain is likely tomorrow.|Yarın yağmur muhtemel.
in case|olur diye|Take a coat in case it gets cold.|Soğur diye palto al.`,
`imagine|hayal etmek|Imagine living by the sea.|Deniz kenarında yaşadığını hayal et.
opportunity|fırsat|This is a good opportunity.|Bu iyi bir fırsat.
afford|maddi gücü yetmek|I cannot afford a new car.|Yeni arabaya gücüm yetmiyor.
instead|onun yerine|We could walk instead.|Onun yerine yürüyebiliriz.
suggest|önermek|I suggest taking a break.|Mola vermeyi öneriyorum.
perhaps|belki|Perhaps we could try again.|Belki yeniden deneyebiliriz.`,
`neighbour|komşu|The neighbour who helped is kind.|Yardım eden komşu nazik.
reliable|güvenilir|She is a reliable colleague.|Güvenilir bir iş arkadaşı.
belong to|ait olmak|This bag belongs to me.|Bu çanta bana ait.
colleague|iş arkadaşı|My colleague lives nearby.|İş arkadaşım yakında yaşıyor.
recommend|tavsiye etmek|I recommend the book I read.|Okuduğum kitabı tavsiye ederim.
nearby|yakında|There is a library nearby.|Yakında bir kütüphane var.`,
`produce|üretmek|Cheese is produced here.|Burada peynir üretilir.
repair|tamir etmek|The door was repaired.|Kapı tamir edildi.
deliver|teslim etmek|The parcel was delivered today.|Paket bugün teslim edildi.
design|tasarlamak|The house was designed by her.|Ev onun tarafından tasarlandı.
material|malzeme|This material is recycled.|Bu malzeme geri dönüştürülür.
process|süreç|The process takes two days.|Süreç iki gün sürer.`,
`mention|bahsetmek|He mentioned the meeting.|Toplantıdan bahsetti.
explain|açıklamak|She explained the problem.|Sorunu açıkladı.
promise|söz vermek|He promised to call.|Aramaya söz verdi.
message|mesaj|I received your message.|Mesajını aldım.
remind|hatırlatmak|Please remind me tomorrow.|Lütfen yarın bana hatırlat.
report|bildirmek|They reported a problem.|Bir sorun bildirdiler.`,
`although|olmasına rağmen|Although it rained, we walked.|Yağmura rağmen yürüdük.
however|ancak / bununla birlikte|It is expensive. However, it lasts.|Pahalı. Ancak dayanıklı.
therefore|bu nedenle|It was late. Therefore, we left.|Geçti. Bu nedenle ayrıldık.
reason|neden|What is the reason?|Nedeni nedir?
benefit|fayda|Exercise has many benefits.|Egzersizin birçok faydası var.
drawback|dezavantaj|The main drawback is the cost.|Temel dezavantaj maliyet.`,
`regret|pişman olmak|I regret missing the chance.|Fırsatı kaçırdığıma pişmanım.
consequence|sonuç / etki|Consider the consequences.|Sonuçları düşün.
prevent|önlemek|We could have prevented it.|Bunu önleyebilirdik.
otherwise|aksi takdirde|Leave now; otherwise, you will be late.|Şimdi çık; yoksa geç kalırsın.
overlook|gözden kaçırmak|We had overlooked a detail.|Bir ayrıntıyı gözden kaçırmıştık.
outcome|sonuç|The outcome could have been different.|Sonuç farklı olabilirdi.`,
`circumstance|koşul|The circumstances have changed.|Koşullar değişti.
impact|etki|Education has a lasting impact.|Eğitimin kalıcı etkisi vardır.
qualification|yeterlilik / belge|This job requires a qualification.|Bu iş bir yeterlilik gerektirir.
previous|önceki|My previous job was demanding.|Önceki işim zorlayıcıydı.
currently|şu anda|I am currently working from home.|Şu anda evden çalışıyorum.
reflect|yansıtmak / düşünmek|Our choices reflect our priorities.|Seçimlerimiz önceliklerimizi yansıtır.`,
`evidence|kanıt|There is no clear evidence.|Açık bir kanıt yok.
assume|varsaymak|Do not assume he knew.|Bildiğini varsayma.
apparently|görünüşe göre|Apparently, the train was delayed.|Görünüşe göre tren gecikti.
conclude|sonuca varmak|What can we conclude from this?|Bundan hangi sonuca varabiliriz?
plausible|makul / akla yatkın|That is a plausible explanation.|Bu akla yatkın bir açıklama.
certainty|kesinlik|We cannot say with certainty.|Kesin olarak söyleyemeyiz.`,
`wish|dilemek|I wish I had more time.|Keşke daha çok vaktim olsa.
frustrated|hayal kırıklığına uğramış / yılgın|I felt frustrated by the delay.|Gecikme beni bunalttı.
appreciate|değerini bilmek / takdir etmek|I appreciate your patience.|Sabrını takdir ediyorum.
expectation|beklenti|We need realistic expectations.|Gerçekçi beklentilere ihtiyacımız var.
patience|sabır|Learning requires patience.|Öğrenmek sabır gerektirir.
motivation|isteklilik / motivasyon|My motivation has improved.|Motivasyonum arttı.`,
`maintain|bakımını yapmak / sürdürmek|The equipment is well maintained.|Ekipmanın bakımı iyi yapılıyor.
renovate|yenilemek|The building is being renovated.|Bina yenileniyor.
arrange|ayarlamak / düzenlemek|I arranged to have it repaired.|Tamir edilmesini ayarladım.
efficient|verimli|The new process is more efficient.|Yeni süreç daha verimli.
procedure|işlem sırası / prosedür|Follow the procedure carefully.|İşlem sırasını dikkatle izle.
inspect|incelemek / denetlemek|The bridge has been inspected.|Köprü denetlendi.`,
`enquire|bilgi istemek / sormak|I would like to enquire about the course.|Kurs hakkında bilgi almak isterim.
clarify|açıklığa kavuşturmak|Could you clarify that point?|O noktayı açıklığa kavuşturabilir misiniz?
confirm|doğrulamak|Please confirm the date.|Lütfen tarihi doğrulayın.
availability|uygunluk / bulunabilirlik|I asked about room availability.|Oda bulunup bulunmadığını sordum.
requirement|gereklilik|What are the entry requirements?|Giriş koşulları nelerdir?
appropriate|uygun|Is this the appropriate form?|Uygun form bu mu?`,
`emphasise|vurgulamak|The author emphasises the risk.|Yazar riski vurguluyor.
remarkable|dikkate değer|Her progress is remarkable.|İlerlemesi dikkate değer.
contribution|katkı|We appreciate your contribution.|Katkınızı takdir ediyoruz.
feature|özellik|The main feature is simplicity.|Temel özellik sadelik.
perspective|bakış açısı|Consider another perspective.|Başka bir bakış açısını düşün.
particularly|özellikle|This part is particularly useful.|Bu bölüm özellikle faydalı.`,
`whereas|oysa / iken|Some agree, whereas others disagree.|Bazıları katılırken diğerleri katılmıyor.
nevertheless|yine de / buna rağmen|It was difficult. Nevertheless, we continued.|Zordu. Yine de devam ettik.
sustainable|sürdürülebilir|We need a sustainable solution.|Sürdürülebilir bir çözüme ihtiyacımız var.
trade-off|bir kazanım için verilen ödün|There is a trade-off between cost and speed.|Maliyet ile hız arasında bir tercih dengesi var.
claim|iddia|The claim needs evidence.|İddia kanıt gerektirir.
tend to|eğiliminde olmak|People tend to choose familiar things.|İnsanlar tanıdık şeyleri seçme eğilimindedir.`
];
export const legacyWords = blocks.flatMap((block,topicIndex)=>block.split('\n').map((line,i)=>{const [en,tr,example,translation]=line.split('|');const topic=grammar[topicIndex];return {id:`w-${topic.id}-${i}`,topic:topic.id,level:topic.level,en,tr,example,translation};}));

export const words = enrichWords(legacyWords);
