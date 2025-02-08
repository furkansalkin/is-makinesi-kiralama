export interface IMakine {
  id: number;
  isim: string;
  kategori: string;
  marka: string;
  model: string;
  gunlukFiyat: number;
  resimUrl: string;
  ozellikler: string[];
  durum: 'müsait' | 'kirada' | 'bakımda';
  teknikOzellikler: {
    motor?: string;
    güç?: string;
    kapasite?: string;
    yil?: number;
  };
} 