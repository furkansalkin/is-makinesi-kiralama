import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Önceden tanımlanmış kategoriler
const MAKINE_KATEGORILERI = [
  'Vinç',
  'Manlift',
  'Forklift',
  'Ekskavatör',
  'Loder',
  'Dozer',
  'Silindir',
  'Greyder',
  'Asfalt Finişeri',
  'Beton Pompası',
  'Beton Mikseri',
  'Teleskopik Yükleyici',
  'Mini Ekskavatör',
  'Kazıcı Yükleyici',
  'Platform'
];

const SEHIRLER = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
  'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur',
  'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan',
  'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
  'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis', 'Kırıkkale', 'Kırklareli',
  'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas',
  'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

interface IMakine {
  _id: string;
  isim: string;
  kategori: string;
  marka: string;
  model: string;
  gunlukFiyat: number;
  resimUrl: string[];
  durum: string;
  sehir: string;
  ilce: string;
  sahibiId: {
    ad: string;
    soyad: string;
  };
}

const MachineListPage: React.FC = () => {
  const navigate = useNavigate();
  const [makineler, setMakineler] = useState<IMakine[]>([]);
  const [filteredMakineler, setFilteredMakineler] = useState<IMakine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtre state'leri
  const [selectedKategori, setSelectedKategori] = useState<string>('');
  const [selectedSehir, setSelectedSehir] = useState<string>('');
  
  // Artık bu state'lere gerek yok
  // const [kategoriler, setKategoriler] = useState<string[]>([]);
  // const [sehirler, setSehirler] = useState<string[]>([]);

  useEffect(() => {
    const fetchMakineler = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}/api/machines`);
        if (response.data.success) {
          const makineData = response.data.data;
          setMakineler(makineData);
          setFilteredMakineler(makineData);
        }
      } catch (err) {
        setError('Makineler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchMakineler();
  }, []);

  // Filtreleme fonksiyonu
  useEffect(() => {
    let filtered = [...makineler];
    
    if (selectedKategori) {
      filtered = filtered.filter(makine => makine.kategori === selectedKategori);
    }
    
    if (selectedSehir) {
      filtered = filtered.filter(makine => makine.sehir === selectedSehir);
    }
    
    setFilteredMakineler(filtered);
  }, [selectedKategori, selectedSehir, makineler]);

  const handleIncele = (makineId: string) => {
    navigate(`/makineler/${makineId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Kiralık Makineler</h1>
      
      {/* Filtreleme Alanı */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
              Makine Kategorisi
            </label>
            <select
              id="kategori"
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Tüm Kategoriler</option>
              {MAKINE_KATEGORILERI.map((kategori) => (
                <option key={kategori} value={kategori}>{kategori}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="sehir" className="block text-sm font-medium text-gray-700 mb-2">
              Şehir
            </label>
            <select
              id="sehir"
              value={selectedSehir}
              onChange={(e) => setSelectedSehir(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Tüm Şehirler</option>
              {SEHIRLER.map((sehir) => (
                <option key={sehir} value={sehir}>{sehir}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filtreleri Temizle Butonu */}
        {(selectedKategori || selectedSehir) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setSelectedKategori('');
                setSelectedSehir('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
      
      {/* Sonuç Sayısı */}
      <div className="mb-4 text-gray-600">
        {filteredMakineler.length} makine bulundu
      </div>
      
      {/* Makine Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMakineler.map((makine) => (
          <div 
            key={makine._id} 
            onClick={() => navigate(`/makineler/${makine._id}`)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative pb-[56.25%] rounded-lg overflow-hidden">
              <img
                src={makine.resimUrl[0] ? makine.resimUrl[0].startsWith('http') ? makine.resimUrl[0] : `${import.meta.env.VITE_API_URL}${makine.resimUrl[0]}` : '/default-machine.jpg'}
                alt={makine.isim}
                className="absolute h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-machine.jpg';
                }}
              />
              <div className="absolute top-0 right-0 m-2">
                <span className={`px-2 py-1 text-sm font-semibold rounded ${
                  makine.durum === 'müsait' ? 'bg-green-500 text-white' :
                  makine.durum === 'kirada' ? 'bg-red-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {makine.durum}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{makine.isim}</h2>
              <p className="text-gray-600 mb-2">{makine.marka} {makine.model}</p>
              <p className="text-gray-500 text-sm mb-2">{makine.kategori}</p>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {makine.sehir}, {makine.ilce}
              </div>
              
              <div className="text-gray-600">
                <span className="font-semibold text-lg text-blue-600">{makine.gunlukFiyat} ₺</span>
                <span className="text-sm"> / gün</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Sonuç Bulunamadı */}
      {filteredMakineler.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Seçilen kriterlere uygun makine bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default MachineListPage; 