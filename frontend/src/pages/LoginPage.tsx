import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    ad: string;
    soyad: string;
    email: string;
    rol: string;
    telefon: string;
    kayitTarihi: string;
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    sifre: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', formData);

      if (response.data.success) {
        // Token'ı localStorage'a kaydet
        localStorage.setItem('token', response.data.token);
        // Kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Sayfayı yenile (bu, App bileşeninin useEffect'ini tetikleyecek)
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Giriş işlemi başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Giriş Yap
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Kayıt Ol
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* Hata Mesajı */}
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Giriş Yap Butonu */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 