import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    sifre: '',
    sifreTekrar: '',
    telefon: '',
    rol: 'kullanici'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Şifre kontrolü
    if (formData.sifre !== formData.sifreTekrar) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ad: formData.ad,
        soyad: formData.soyad,
        email: formData.email,
        sifre: formData.sifre,
        telefon: formData.telefon,
        rol: formData.rol
      });

      if (response.data.success) {
        setSuccess('Kayıt işlemi başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
        
        // 2 saniye sonra giriş sayfasına yönlendir
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt işlemi başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Hesap Oluştur
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Başarı Mesajı */}
          {success && (
            <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {success}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Ad Soyad */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ad" className="block text-sm font-medium text-gray-700">
                  Ad
                </label>
                <input
                  id="ad"
                  name="ad"
                  type="text"
                  required
                  value={formData.ad}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="soyad" className="block text-sm font-medium text-gray-700">
                  Soyad
                </label>
                <input
                  id="soyad"
                  name="soyad"
                  type="text"
                  required
                  value={formData.soyad}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                required
                value={formData.telefon}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="5xx... veya 05xx..."
              />
            </div>

            {/* Şifre */}
            <div>
              <label htmlFor="sifre" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                id="sifre"
                name="sifre"
                type="password"
                required
                value={formData.sifre}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Şifre Tekrar */}
            <div>
              <label htmlFor="sifreTekrar" className="block text-sm font-medium text-gray-700">
                Şifre Tekrar
              </label>
              <input
                id="sifreTekrar"
                name="sifreTekrar"
                type="password"
                required
                value={formData.sifreTekrar}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Rol Seçimi */}
            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                Hesap Türü
              </label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="kullanici">Kiralayıcı</option>
                <option value="makine_sahibi">Makine Sahibi</option>
              </select>
            </div>

            {/* Hata Mesajı */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-4 rounded-md">
                {error}
              </div>
            )}

            {/* Kayıt Ol Butonu */}
            <div>
              <button
                type="submit"
                disabled={loading || success !== ''}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  (loading || success !== '') ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 