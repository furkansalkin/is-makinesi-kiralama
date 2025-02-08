import { IMakine } from '../types';

export const makineler: IMakine[] = [
  {
    id: 1,
    isim: "Paletli Ekskavatör",
    kategori: "Kazı Makineleri",
    marka: "Caterpillar",
    model: "CAT 320",
    gunlukFiyat: 2500,
    resimUrl: "https://images.unsplash.com/photo-1563606618307-9657b0e76f5d?q=80&w=600",
    ozellikler: ["GPS Takip Sistemi", "Klima", "Geri Görüş Kamerası"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "Cat C4.4 ACERT",
      güç: "162 HP",
      kapasite: "1.19 m³",
      yil: 2022
    }
  },
  {
    id: 2,
    isim: "Teleskopik Forklift",
    kategori: "Kaldırma Ekipmanları",
    marka: "JCB",
    model: "535-95",
    gunlukFiyat: 1800,
    resimUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600",
    ozellikler: ["360° Görüş", "Stabilizatörler", "Joystick Kontrol"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "JCB EcoMAX",
      güç: "109 HP",
      kapasite: "3500 kg",
      yil: 2023
    }
  },
  {
    id: 3,
    isim: "Silindir",
    kategori: "Yol Yapım Ekipmanları",
    marka: "BOMAG",
    model: "BW 213",
    gunlukFiyat: 1500,
    resimUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=600",
    ozellikler: ["Vibrasyonlu Sıkıştırma", "Eco Mode", "LED Aydınlatma"],
    durum: "kirada",
    teknikOzellikler: {
      motor: "Deutz TCD 3.6",
      güç: "130 HP",
      kapasite: "12.5 ton",
      yil: 2021
    }
  },
  {
    id: 4,
    isim: "Mini Ekskavatör",
    kategori: "Kazı Makineleri",
    marka: "Kubota",
    model: "U55-4",
    gunlukFiyat: 1200,
    resimUrl: "https://images.unsplash.com/photo-1579633771636-43a4d15fc3e7?q=80&w=600",
    ozellikler: ["Sıfır Kuyruk", "Hızlı Bağlantı", "Otomatik Rölanti"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "Kubota V2607-CR-TE4",
      güç: "47.6 HP",
      kapasite: "0.16 m³",
      yil: 2023
    }
  },
  {
    id: 5,
    isim: "Beko Loder",
    kategori: "Çok Amaçlı",
    marka: "Case",
    model: "580ST",
    gunlukFiyat: 1600,
    resimUrl: "https://images.unsplash.com/photo-1572431447238-425af66a273b?q=80&w=600",
    ozellikler: ["4x4", "Powershift", "Ride Control"],
    durum: "bakımda",
    teknikOzellikler: {
      motor: "FPT F5HFL463A",
      güç: "95 HP",
      kapasite: "1.0 m³",
      yil: 2022
    }
  },
  {
    id: 6,
    isim: "Mobil Vinç",
    kategori: "Kaldırma Ekipmanları",
    marka: "Liebherr",
    model: "LTM 1060",
    gunlukFiyat: 3500,
    resimUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=600",
    ozellikler: ["60 ton Kapasite", "Teleskopik Bom", "VarioBase"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "Liebherr D946",
      güç: "400 HP",
      kapasite: "60 ton",
      yil: 2023
    }
  },
  {
    id: 7,
    isim: "Asfalt Finişeri",
    kategori: "Yol Yapım Ekipmanları",
    marka: "Vögele",
    model: "SUPER 1800-3i",
    gunlukFiyat: 4000,
    resimUrl: "https://images.unsplash.com/photo-1573075175660-08fd45ac27a1?q=80&w=600",
    ozellikler: ["ErgoPlus 3", "AutoSet Plus", "PaveDock"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "Cummins QSB6.7-C203",
      güç: "127 kW",
      kapasite: "700 t/h",
      yil: 2022
    }
  },
  {
    id: 8,
    isim: "Lastikli Yükleyici",
    kategori: "Yükleme Ekipmanları",
    marka: "Volvo",
    model: "L120H",
    gunlukFiyat: 2200,
    resimUrl: "https://images.unsplash.com/photo-1579633771624-e2e7df6c2196?q=80&w=600",
    ozellikler: ["OptiShift", "Boom Suspension", "CDC"],
    durum: "kirada",
    teknikOzellikler: {
      motor: "Volvo D8J",
      güç: "276 HP",
      kapasite: "3.3 m³",
      yil: 2023
    }
  },
  {
    id: 9,
    isim: "Dozer",
    kategori: "Toprak İşleme",
    marka: "Komatsu",
    model: "D61EX-24",
    gunlukFiyat: 2800,
    resimUrl: "https://images.unsplash.com/photo-1579633771698-d6d8d9b4c06c?q=80&w=600",
    ozellikler: ["SIGMADOZER", "PAT Bıçak", "Riper"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "Komatsu SAA6D107E-3",
      güç: "168 HP",
      kapasite: "4.5 m³",
      yil: 2022
    }
  },
  {
    id: 10,
    isim: "Mobil Kırıcı",
    kategori: "Kırma-Eleme",
    marka: "Metso",
    model: "LT120",
    gunlukFiyat: 5000,
    resimUrl: "https://images.unsplash.com/photo-1579633771535-b0ca0b7ec740?q=80&w=600",
    ozellikler: ["IC700 Kontrol", "Bypass", "Manyetik Seperatör"],
    durum: "müsait",
    teknikOzellikler: {
      motor: "CAT C13",
      güç: "420 HP",
      kapasite: "450 t/h",
      yil: 2023
    }
  }
]; 