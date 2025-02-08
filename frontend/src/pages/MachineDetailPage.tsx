import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  teknikOzellikler: {
    motor?: string;
    guc?: string;
    kapasite?: string;
    yil?: number;
  };
  sahibiId: {
    ad: string;
    soyad: string;
    telefon: string;
    email: string;
  };
}

const MachineDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [makine, setMakine] = useState<IMakine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchMakine = async () => {
      try {
        if (!id) {
          setError('Makine ID bulunamadı');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/machines/${id}`);
        
        if (response.data.success && response.data.data) {
          setMakine(response.data.data);
          setError(null);
        } else {
          setError('Makine bilgileri alınamadı');
        }
      } catch (err) {
        console.error('Makine detayları yüklenirken hata:', err);
        setError('Makine detayları yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchMakine();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !makine) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error || 'Makine bulunamadı'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Makine Başlığı */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
            <h1 className="text-3xl font-bold text-white">{makine.isim}</h1>
            <p className="mt-2 text-blue-100">{makine.kategori}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Sol Kolon - Resimler */}
              <div>
                <div className="relative pb-[75%] rounded-lg overflow-hidden mb-4">
                  <img
                    src={makine.resimUrl[activeImage] ? `${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}${makine.resimUrl[activeImage]}` : '/default-machine.jpg'}
                    alt={makine.isim}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                {makine.resimUrl.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {makine.resimUrl.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative pb-[75%] rounded-lg overflow-hidden ${
                          index === activeImage ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <img
                          src={`${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}${url}`}
                          alt={`${makine.isim} ${index + 1}`}
                          className="absolute h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sağ Kolon - Detaylar ve İletişim */}
              <div>
                {/* Makine Bilgileri */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Makine Bilgileri</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Marka</p>
                      <p className="font-medium">{makine.marka}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Model</p>
                      <p className="font-medium">{makine.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Günlük Fiyat</p>
                      <p className="font-medium text-blue-600">{makine.gunlukFiyat} ₺</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Durum</p>
                      <p className={`font-medium ${
                        makine.durum === 'müsait' ? 'text-green-600' :
                        makine.durum === 'kirada' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {makine.durum.charAt(0).toUpperCase() + makine.durum.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teknik Özellikler */}
                {makine.teknikOzellikler && Object.keys(makine.teknikOzellikler).length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Teknik Özellikler</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {makine.teknikOzellikler.motor && (
                        <div>
                          <p className="text-sm text-gray-500">Motor</p>
                          <p className="font-medium">{makine.teknikOzellikler.motor}</p>
                        </div>
                      )}
                      {makine.teknikOzellikler.guc && (
                        <div>
                          <p className="text-sm text-gray-500">Güç</p>
                          <p className="font-medium">{makine.teknikOzellikler.guc}</p>
                        </div>
                      )}
                      {makine.teknikOzellikler.kapasite && (
                        <div>
                          <p className="text-sm text-gray-500">Kapasite</p>
                          <p className="font-medium">{makine.teknikOzellikler.kapasite}</p>
                        </div>
                      )}
                      {makine.teknikOzellikler.yil && (
                        <div>
                          <p className="text-sm text-gray-500">Üretim Yılı</p>
                          <p className="font-medium">{makine.teknikOzellikler.yil}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Konum Bilgisi */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Konum</h2>
                  <div className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{makine.sehir}, {makine.ilce}</span>
                  </div>
                </div>

                {/* İletişim Bilgileri */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                  <div className="space-y-6">
                    {/* Makine Sahibi */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="ml-3 text-lg text-gray-900">
                        {makine.sahibiId.ad.charAt(0).toUpperCase() + makine.sahibiId.ad.slice(1).toLowerCase()}{' '}
                        {makine.sahibiId.soyad.toUpperCase()}
                      </span>
                    </div>

                    {/* Telefon */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className="ml-3 text-lg text-gray-900">Telefon:</span>
                      <a 
                        href={`tel:${makine.sahibiId.telefon}`}
                        className="ml-2 text-lg font-medium text-blue-600 hover:text-blue-800"
                      >
                        {makine.sahibiId.telefon}
                      </a>
                    </div>

                    {/* E-posta */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="ml-3 text-lg text-gray-900">E-posta:</span>
                      <a 
                        href={`mailto:${makine.sahibiId.email}`}
                        className="ml-2 text-lg font-medium text-blue-600 hover:text-blue-800"
                      >
                        {makine.sahibiId.email}
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div className="pt-4">
                      <a
                        href={`https://wa.me/${makine.sahibiId.telefon?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
                      >
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        WhatsApp ile İletişime Geç
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailPage; 