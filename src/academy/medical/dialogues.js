// Original fictional language scenarios; no patient data or patient-specific treatment recommendations.
export const medicalDialogues=[
 {id:'opening',title:'Görüşmeyi açma ve öykü alma',focus:'Açık uçlu soruyla başla, süreyi netleştir.',lines:[
 ['doctor','Hello, I am Dr Yener. How would you like me to address you?','Merhaba, ben Doktor Yener. Size nasıl hitap etmemi istersiniz?'],
 ['patient','Please call me Alex.','Lütfen bana Alex deyin.'],
 ['doctor','What brings you in today?','Bugün sizi buraya getiren şikâyet nedir?'],
 ['patient','I have been feeling unusually tired.','Alışılmadık derecede yorgun hissediyorum.'],
 ['doctor','When did you first notice this?','Bunu ilk ne zaman fark ettiniz?'],
 ['patient','About two weeks ago. It is affecting my work.','Yaklaşık iki hafta önce. İşimi etkiliyor.'],
 ['doctor','Could you tell me more about how it affects your day?','Gününüzü nasıl etkilediğini biraz daha anlatabilir misiniz?']
 ],checks:[['Yorgunluğun başlangıcını öğrenmek istiyorsun.','When did you first notice this?','What is your preferred name?','May I examine your knee?','When did…? geçmişteki başlangıcı sorar.'],['Hasta “It is affecting my work” diyor. Ne anlatıyor?','Şikâyetin günlük yaşamına etkisini','İlaç alerjisini','Ailedeki hastalık öyküsünü','Affect = etkilemek. Burada iş yaşamına etkisini anlatıyor.']]},
 {id:'pain',title:'Ağrının yerini ve niteliğini sorma',focus:'Yer → süre → nitelik → yayılım → etkileyen durumlar.',lines:[
 ['doctor','Can you point to where it hurts?','Ağrıyan yeri gösterebilir misiniz?'],
 ['patient','It hurts here, in my lower back.','Burada, belimde ağrıyor.'],
 ['doctor','How would you describe the pain?','Ağrıyı nasıl tarif edersiniz?'],
 ['patient','It is a dull ache most of the time.','Çoğu zaman künt bir sızı.'],
 ['doctor','Does the pain spread anywhere?','Ağrı başka bir yere yayılıyor mu?'],
 ['patient','Sometimes it goes down my right leg.','Bazen sağ bacağıma doğru yayılıyor.'],
 ['doctor','What makes it better or worse?','Neler hafifletiyor veya kötüleştiriyor?']
 ],checks:[['Ağrının yayılımını soran cümleyi seç.','Does the pain spread anywhere?','How would you like me to address you?','Are you taking any medicines?','Spread = yayılmak. Soru ağrının başka bir yere gidip gitmediğini sorar.'],['“A dull ache” hangi ağrı tarifidir?','Künt bir sızı','Zonklayıcı ağrı','Bıçak saplanır gibi ağrı','Dull = künt; ache = ağrı veya sızı.']]},
 {id:'breathing',title:'Solunum yakınmasını netleştirme',focus:'Hastanın ifadesini anlaşılır bir soruyla aç.',lines:[
 ['doctor','Please tell me what you mean by feeling breathless.','Nefesinizin daraldığını söylerken ne hissettiğinizi anlatın.'],
 ['patient','I get out of breath when I walk upstairs.','Merdiven çıkınca nefesim kesiliyor.'],
 ['doctor','Does it also happen when you are resting?','Dinlenirken de oluyor mu?'],
 ['patient','Sometimes, but mostly when I move around.','Bazen, ama çoğunlukla hareket ederken.'],
 ['doctor','Have you noticed a cough or wheezing?','Öksürük veya hırıltı fark ettiniz mi?'],
 ['patient','I have a dry cough.','Kuru öksürüğüm var.'],
 ['doctor','I would like to examine you and check your breathing.','Sizi muayene edip solunumunuzu değerlendirmek istiyorum.']
 ],checks:[['“At rest” ifadesinin anlamı nedir?','İstirahatte','Uykudan önce','Hareket sonrasında','Rest = dinlenme; at rest = istirahatte.'],['Balgam olup olmadığını netleştirmek için hangi soru uygundur?','Are you bringing up any sputum?','What is your date of birth?','Is your wrist swollen?','Bring up sputum = balgam çıkarmak; öksürüğün niteliğini netleştirir.']]},
 {id:'medicines',title:'İlaç ve alerji öyküsü',focus:'İlacın adını, reaksiyonu ve zamanını ayrı ayrı sor.',lines:[
 ['doctor','Are you taking any medicines, including supplements?','Takviyeler dâhil herhangi bir ilaç kullanıyor musunuz?'],
 ['patient','I take a tablet every day, but I cannot remember its name.','Her gün bir tablet alıyorum ama adını hatırlayamıyorum.'],
 ['doctor','Do you have the packet or a photograph of it?','Kutusu veya bir fotoğrafı yanınızda mı?'],
 ['patient','Yes, I have a photograph on my phone.','Evet, telefonumda fotoğrafı var.'],
 ['doctor','Do you have any medicine allergies?','İlaç alerjiniz var mı?'],
 ['patient','I once developed a rash after taking a medicine.','Bir keresinde ilaç aldıktan sonra döküntüm oldu.'],
 ['doctor','Which medicine was it, and how soon did the rash appear?','Hangi ilaçtı ve döküntü ne kadar sonra çıktı?']
 ],checks:[['“Over-the-counter medicine” ne demektir?','Reçetesiz ilaç','Hastanede hazırlanan ilaç','Sadece enjeksiyonla verilen ilaç','Over-the-counter, reçete olmadan alınabilen ilaçlar için kullanılan ifadedir.'],['Hasta ilaç adını hatırlamıyor. Hangi cümle bilgiyi netleştirir?','Do you have the packet or a photograph of it?','Please straighten your leg.','Is the pain sharp?','Packet veya photograph, kullanılan ilacı doğru adlandırmaya yardımcı olabilir.']]},
 {id:'examination',title:'İzin alarak muayene etme',focus:'İşlemi anlat, izin iste, hastanın durdurabileceğini belirt.',lines:[
 ['doctor','I would like to examine your abdomen. May I proceed?','Karnınızı muayene etmek istiyorum. Devam edebilir miyim?'],
 ['patient','Yes. Will it hurt?','Evet. Acır mı?'],
 ['doctor','I will press gently. Please tell me if it hurts.','Hafifçe bastıracağım. Acırsa lütfen söyleyin.'],
 ['patient','All right.','Peki.'],
 ['doctor','You can ask me to stop at any time.','İstediğiniz zaman durmamı isteyebilirsiniz.'],
 ['patient','This area is tender.','Bu bölge dokunmakla hassas.'],
 ['doctor','Thank you for telling me. I will pause.','Söylediğiniz için teşekkür ederim. Ara vereceğim.']
 ],checks:[['Muayeneye devam etmek için izin isteyen cümle hangisi?','May I proceed?','What colour is the sputum?','When was your last meal?','May I…? izin istemenin nazik bir yoludur; proceed = devam etmek.'],['“This area is tender” ne anlatır?','Bu bölge dokunmakla hassas','Bu bölge tamamen uyuşmuş','Bu bölge kaşınıyor','Tender burada dokunmakla hassas anlamında; numb ise uyuşmuş demektir.']]},
 {id:'tests',title:'Tetkiki ve belirsizliği açıklama',focus:'İşlemin amacını, sonuçların nasıl paylaşılacağını anlat.',lines:[
 ['doctor','I would like to arrange some tests. Let me explain why.','Bazı tetkikler planlamak istiyorum. Nedenini açıklayayım.'],
 ['patient','Will I need to prepare for them?','Bunlar için hazırlık yapmam gerekecek mi?'],
 ['doctor','We will give you instructions for each test.','Her test için size talimat vereceğiz.'],
 ['patient','When will I hear about the results?','Sonuçlar hakkında ne zaman bilgi alacağım?'],
 ['doctor','We will confirm how and when the results will be shared.','Sonuçların nasıl ve ne zaman paylaşılacağını netleştireceğiz.'],
 ['patient','Does the test tell us exactly what is wrong?','Test sorunun tam olarak ne olduğunu söyler mi?'],
 ['doctor','It gives us more information. We will discuss it alongside your symptoms.','Bize daha fazla bilgi verir. Belirtilerinizle birlikte değerlendireceğiz.']
 ],checks:[['Hasta test öncesi hazırlığı nasıl sorar?','Will I need to prepare for the test?','Does the pain spread anywhere?','Please bend your knee.','Prepare for = bir şeye hazırlanmak.'],['Sonuçların paylaşılma zamanını soran cümle hangisi?','When will I hear about the results?','Have you had any operations?','May I check your pulse?','When = ne zaman; hear about the results = sonuçlar hakkında bilgi almak.']]},
 {id:'sensitive',title:'Mahrem sorular ve tercüman desteği',focus:'İzin, rahatlık ve anlaşılır dil.',lines:[
 ['doctor','I would like to ask some personal questions. Is that all right?','Bazı kişisel sorular sormak istiyorum. Sizin için uygun mu?'],
 ['patient','I would prefer to speak without my relative here.','Yakınım burada olmadan konuşmayı tercih ederim.'],
 ['doctor','Of course. We can speak privately.','Elbette. Özel olarak görüşebiliriz.'],
 ['patient','I may need help with some English words.','Bazı İngilizce kelimeler için yardıma ihtiyacım olabilir.'],
 ['doctor','Would you like a professional interpreter?','Profesyonel bir tercüman ister misiniz?'],
 ['patient','Yes, please.','Evet, lütfen.'],
 ['doctor','We can arrange that before we continue.','Devam etmeden önce bunu ayarlayabiliriz.']
 ],checks:[['“We can speak privately” ne demektir?','Özel olarak görüşebiliriz','Daha yüksek sesle konuşabiliriz','Daha hızlı konuşabiliriz','Privately = başkalarının duymadığı özel bir ortamda.'],['Dil desteği teklif eden soru hangisidir?','Would you like a professional interpreter?','Would you like to lie down?','Have you noticed any swelling?','Interpreter = sözlü tercüman; chaperone farklı bir roldür.']]},
 {id:'follow-up',title:'Planı özetleme ve kontrol görüşmesi',focus:'Hastanın anladığını kendi sözleriyle anlatmasına alan aç.',lines:[
 ['doctor','Let us go through the plan once more.','Planı bir kez daha gözden geçirelim.'],
 ['patient','Could you write it down for me?','Benim için yazar mısınız?'],
 ['doctor','Yes. I will include the follow-up arrangements.','Evet. Kontrol düzenlemelerini de ekleyeceğim.'],
 ['patient','What should I do if things change?','Durum değişirse ne yapmalıyım?'],
 ['doctor','I will explain what to watch for and who to contact.','Nelere dikkat etmeniz ve kiminle iletişime geçmeniz gerektiğini açıklayacağım.'],
 ['patient','Thank you. I want to make sure I understand.','Teşekkür ederim. Anladığımdan emin olmak istiyorum.'],
 ['doctor','Could you tell me the plan in your own words?','Planı kendi kelimelerinizle anlatır mısınız?']
 ],checks:[['Planın anlaşıldığını kontrol etmek için hangi cümleyi kullanırsın?','Could you tell me the plan in your own words?','When did the bleeding start?','Can you point to the pain?','In your own words = kendi kelimelerinle; hastanın nasıl anladığını duymayı sağlar.'],['“Follow-up appointment” ne demektir?','Kontrol randevusu','Acil ameliyat','Laboratuvar örneği','Follow-up, ilk görüşmeden sonraki izlem veya yeniden değerlendirmedir.']]}
];
export const medicalDialogueExercises=medicalDialogues.flatMap(d=>d.checks.map(([prompt,answer,a,b,why],i)=>({id:`clinical-dialogue-${d.id}-${i}`,kind:'vocabulary',level:'B1',prompt,answer,options:[answer,a,b],why,dialogue:d.id})));
