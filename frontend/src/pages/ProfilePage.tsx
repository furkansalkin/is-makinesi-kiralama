import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [makinelerim, setMakinelerim] = useState<IMakine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    const fetchMakinelerim = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}/api/machines/my-machines`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setMakinelerim(response.data.data);
        }
      } catch (error) {
        console.error('Makineler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakinelerim();
  }, [navigate]);

  const handleDelete = async (makineId: string) => {
    if (!window.confirm('Bu makineyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}/api/machines/${makineId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('Makine başarıyla silindi');
        // Makine listesini güncelle
        setMakinelerim(prev => prev.filter(makine => makine._id !== makineId));
      }
    } catch (error) {
      console.error('Makine silme hatası:', error);
      toast.error('Makine silinirken bir hata oluştu');
    }
  };

  const handleEdit = (makineId: string) => {
    navigate(`/makine-duzenle/${makineId}`);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profil Başlığı */}
      <div className="bg-blue-600 px-6 py-8 relative z-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold">
              {user.ad[0].toUpperCase()}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{user.ad} {user.soyad}</h1>
              <p className="text-blue-100">{user.rol === 'makine_sahibi' ? 'Makine Sahibi' : 'Kiralayıcı'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profil İçeriği */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sol Kolon - Kişisel Bilgiler */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">E-posta</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Telefon</label>
                  <p className="text-gray-800">{user.telefon || 'Belirtilmemiş'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Hesap Türü</label>
                  <p className="text-gray-800">{user.rol === 'makine_sahibi' ? 'Makine Sahibi' : 'Kiralayıcı'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Kayıt Tarihi</label>
                  <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Makinelerim veya Kiraladıklarım */}
          <div className="md:col-span-2">
            {user.rol === 'makine_sahibi' ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Makinelerim</h2>
                  <button
                    onClick={() => navigate('/makine-ekle')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Yeni Makine Ekle
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : makinelerim.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {makinelerim.map((makine) => (
                      <div key={makine._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="relative pb-48">
                          <img
                            src={makine.resimUrl[0] ? makine.resimUrl[0].startsWith('http') ? makine.resimUrl[0] : `${import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com'}${makine.resimUrl[0]}` : '/default-machine.jpg'}
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
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{makine.isim}</h3>
                          <p className="text-gray-600 mb-2">{makine.marka} {makine.model}</p>
                          <p className="text-gray-500 text-sm mb-2">{makine.kategori}</p>
                          <div className="flex items-center text-gray-600 text-sm mb-4">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {makine.sehir}, {makine.ilce}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-gray-600">
                              <span className="font-semibold text-lg text-blue-600">{makine.gunlukFiyat} ₺</span>
                              <span className="text-sm"> / gün</span>
                            </div>
                            <div className="space-x-2">
                              <button 
                                onClick={() => handleEdit(makine._id)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                                Düzenle
                              </button>
                              <button 
                                onClick={() => handleDelete(makine._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
                                Sil
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500 mb-4">Henüz hiç makine eklememişsiniz.</p>
                    <button
                      onClick={() => navigate('/makine-ekle')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      İlk Makinenizi Ekleyin
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Kiraladığım Makineler</h2>
                <p className="text-gray-500">Henüz hiç makine kiralamadınız.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 