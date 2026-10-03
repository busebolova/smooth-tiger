export type Locale = "tr" | "en";
export type Product = {
  id: string;
  category: "tea" | "coffee";
  name: { tr: string; en: string };
  detail: { tr: string; en: string };
  prices: { size: string; price: number }[];
  accent: "teal" | "apricot";
};

export const products: Product[] = [
  { id: "asil-sadik", category: "tea", name: { tr: "Asil & Sadık", en: "Royal & Loyal" }, detail: { tr: "Huo Shan Huang Ya · Altın Yaprak Ödüllü Sarı Çay", en: "Huo Shan Huang Ya · Golden Leaf Award Yellow Tea" }, prices: [{ size: "50g", price: 2000 }], accent: "teal" },
  { id: "balmy", category: "tea", name: { tr: "Balmy", en: "Balmy" }, detail: { tr: "Organik Ballı Çalı", en: "Organic Honeybush" }, prices: [{ size: "50g", price: 450 }], accent: "apricot" },
  { id: "baharatli", category: "tea", name: { tr: "Baharatlı Suç Ortakları", en: "Spicy Partners in Crime" }, detail: { tr: "Baharatlı Siyah Çay", en: "Masala Chai" }, prices: [{ size: "50g", price: 400 }, { size: "100g", price: 700 }, { size: "500g", price: 3000 }], accent: "apricot" },
  { id: "beyaz-sakayik", category: "tea", name: { tr: "Beyaz Şakayık Çayı", en: "White Peony Tea" }, detail: { tr: "Beyaz çay", en: "White tea" }, prices: [{ size: "50g", price: 550 }, { size: "100g", price: 1000 }], accent: "teal" },
  { id: "esas-mesele", category: "tea", name: { tr: "Esas Mesele", en: "The Real Deal" }, detail: { tr: "Assam FOP1", en: "Assam FOP1" }, prices: [{ size: "50g", price: 500 }, { size: "100g", price: 950 }, { size: "500g", price: 4570 }], accent: "apricot" },
  { id: "hello-mate", category: "tea", name: { tr: "Hello Mate", en: "Hello Mate" }, detail: { tr: "Mate", en: "Mate" }, prices: [{ size: "50g", price: 400 }, { size: "100g", price: 700 }], accent: "teal" },
  { id: "kizil-cali", category: "tea", name: { tr: "Kızıl Çalı", en: "Redbush" }, detail: { tr: "Rooibos", en: "Rooibos" }, prices: [{ size: "50g", price: 400 }, { size: "100g", price: 700 }], accent: "apricot" },
  { id: "matcha", category: "tea", name: { tr: "Matcha", en: "Matcha" }, detail: { tr: "Seremoniyal Öğütülmüş", en: "Ceremonial Powdered" }, prices: [{ size: "25g teneke", price: 750 }, { size: "50g", price: 1300 }], accent: "teal" },
  { id: "turk-cayi", category: "tea", name: { tr: "Türk Çayı", en: "Turkish Tea" }, detail: { tr: "Geleneksel siyah çay", en: "Traditional black tea" }, prices: [{ size: "50g", price: 250 }, { size: "100g", price: 450 }, { size: "500g", price: 800 }], accent: "apricot" },
  { id: "elma", category: "tea", name: { tr: "Türk Elma Çayı Karışımı", en: "Turkish Apple Tea Blend" }, detail: { tr: "Meyveli çay karışımı", en: "Fruit tea blend" }, prices: [{ size: "50g", price: 350 }, { size: "100g", price: 500 }, { size: "500g", price: 2000 }], accent: "teal" },
  { id: "bilinen-guzel", category: "tea", name: { tr: "Bilinen Güzel", en: "Noted Beauty" }, detail: { tr: "Mao Jian Yeşil Çay", en: "Mao Jian Green Tea" }, prices: [{ size: "50g", price: 450 }, { size: "100g", price: 800 }], accent: "teal" },
  { id: "brazil", category: "coffee", name: { tr: "Brezilya FC Santos", en: "Brazil FC Santos" }, detail: { tr: "%100 Arabica · Orta Kavrulmuş", en: "100% Arabica · Medium Roast" }, prices: [{ size: "100g", price: 300 }, { size: "200g", price: 550 }, { size: "500g", price: 1150 }], accent: "apricot" },
  { id: "sidamo", category: "coffee", name: { tr: "Etiyopya Sidamo", en: "Ethiopia Sidamo" }, detail: { tr: "Atasal Çekirdek · %100 Arabica · Orta Kavrulmuş", en: "Heirloom Beans · 100% Arabica · Medium Roast" }, prices: [{ size: "100g", price: 350 }, { size: "200g", price: 650 }, { size: "500g", price: 1250 }], accent: "teal" },
  { id: "turk-kahvesi", category: "coffee", name: { tr: "Türk Kahvesi", en: "Turkish Coffee" }, detail: { tr: "İnce Öğütülmüş · Orta Kavrulmuş · %100 Arabica", en: "Finely Ground · Medium Roast · 100% Arabica" }, prices: [{ size: "100g", price: 200 }, { size: "200g", price: 350 }, { size: "500g", price: 700 }], accent: "apricot" },
];

export const formatPrice = (price: number) => new Intl.NumberFormat("tr-TR").format(price) + " TL";
