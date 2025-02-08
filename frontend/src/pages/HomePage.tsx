import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IMakine {
  _id: string;
  isim: string;
  marka: string;
  model: string;
  resimUrl: string[];
}

const HomePage = () => {
  const [oneCikanMakineler, setOneCikanMakineler] = useState<IMakine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMakineler = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}/api/machines/random?count=3`);
        if (response.data.success) {
          setOneCikanMakineler(response.data.data);
        }
      } catch (error) {
        console.error('Makineler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMakineler();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              İş Makinesi Kiralama
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Türkiye'nin en geniş iş makinesi filosu ile projelerinize güç katın.
            </p>
            <div className="mt-10">
              <Link
                to="/makineler"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Makine Kirala
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Öne Çıkan Makineler */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
          Öne Çıkan Makineler
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oneCikanMakineler.map(makine => (
              <div key={makine._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-48">
                  <img 
                    src={makine.resimUrl[0] ? makine.resimUrl[0].startsWith('http') ? makine.resimUrl[0] : `${import.meta.env.VITE_API_URL}${makine.resimUrl[0]}` : '/default-machine.jpg'}
                    alt={makine.isim}
                    className="absolute h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-machine.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{makine.isim}</h3>
                  <p className="text-gray-600">{makine.marka} {makine.model}</p>
                  <div className="mt-4">
                    <Link
                      to={`/makineler/${makine._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Detayları Gör →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Neden Biz? */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">7/24 Destek</h3>
              <p className="mt-2 text-base text-gray-500">
                Teknik ekibimiz her an yanınızda.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Kaliteli Hizmet</h3>
              <p className="mt-2 text-base text-gray-500">
                Bakımlı ve güvenilir makineler.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Uygun Fiyat</h3>
              <p className="mt-2 text-base text-gray-500">
                Rekabetçi fiyatlarla kiralama imkanı.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 