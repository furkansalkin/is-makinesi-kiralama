import React from 'react'

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Hakkımızda
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              2010'dan beri Türkiye'nin iş makinesi ihtiyacını karşılıyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Şirket Bilgileri */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Vizyonumuz
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Türkiye'nin en büyük ve en güvenilir iş makinesi kiralama şirketi olmak. 
              Müşterilerimize en kaliteli hizmeti, en uygun fiyatlarla sunmak için çalışıyoruz.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">Değerlerimiz</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">Müşteri memnuniyeti odaklı hizmet</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">Sürekli yenilenen makine parkuru</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">Profesyonel teknik destek</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img className="w-full h-64 object-cover rounded-lg" src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600" alt="İş makinesi" />
            <img className="w-full h-64 object-cover rounded-lg" src="https://images.unsplash.com/photo-1563606618307-9657b0e76f5d?q=80&w=600" alt="İş makinesi" />
            <img className="w-full h-64 object-cover rounded-lg" src="https://images.unsplash.com/photo-1579633771698-d6d8d9b4c06c?q=80&w=600" alt="İş makinesi" />
            <img className="w-full h-64 object-cover rounded-lg" src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=600" alt="İş makinesi" />
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">250+</div>
              <div className="mt-2 text-lg text-blue-100">İş Makinesi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">1000+</div>
              <div className="mt-2 text-lg text-blue-100">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">13</div>
              <div className="mt-2 text-lg text-blue-100">Yıllık Tecrübe</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">24/7</div>
              <div className="mt-2 text-lg text-blue-100">Teknik Destek</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage 