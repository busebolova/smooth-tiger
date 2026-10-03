# Smooth Tiger Motion Upgrade

## Amaç
Mevcut film editoryali tasarımı bozmadan siteyi güçlü, çağdaş ve akıcı bir hareket diliyle yükseltmek.

## Uygulama
- Sayfa değişimlerinde Smooth Tiger’a özgü üç çizgili kaplan tırmalama geçişi eklemek.
- Ana görsellerde kontrollü parallax, hafif kamera yakınlaşması ve katmanlı başlık hareketi kullanmak.
- Bölüm başlıkları, ürünler ve hikâye metinlerini kaydırmaya bağlı GSAP girişleriyle sırayla ortaya çıkarmak.
- Ürün görsellerine sinematik reveal maskeleri ve masaüstünde ölçülü işaretçi tepkisi eklemek.
- Hareket azaltma tercihini desteklemek; mobilde performans ve okunabilirliği korumak.
- Tüm sayfalarda benzersiz paylaşım başlıkları ve açıklamalarını tamamlamak.

## Teknik detay
- GSAP + ScrollTrigger yalnızca tarayıcıda çalışacak ortak bir hareket katmanında kurulacak.
- Hareket seçicileri içerikten bağımsız veri nitelikleriyle uygulanacak; mevcut iki dilli metin, ürün verisi ve sepet davranışı değişmeyecek.
- Animasyonlar bileşen kapanışında temizlenecek; dokunmatik cihazlarda ağır işaretçi efektleri devre dışı kalacak.

## Doğrulama
- Masaüstü ve mobil ana sayfa ile en az bir katalog sayfasında kaydırma ve sayfa geçişleri kontrol edilecek.
- Konsol hataları, kırık bağlantılar, metin taşmaları ve azaltılmış hareket modu doğrulanacak.
