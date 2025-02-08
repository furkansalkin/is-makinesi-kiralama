import mongoose, { Document, Schema } from 'mongoose';

interface IMachineBase {
  sahibiId: mongoose.Types.ObjectId;
  isim: string;
  kategori: string;
  modelAdi: string;
  marka: string;
  gunlukFiyat: number;
  resimUrl: string[];
  ozellikler: string[];
  durum: 'müsait' | 'kirada' | 'bakımda';
  teknikOzellikler: {
    motor?: string;
    guc?: string;
    kapasite?: string;
    yil?: number;
  };
  sehir: string;
  ilce: string;
  eklemeTarihi: Date;
}

export interface IMachine extends Document, IMachineBase {}

const machineSchema = new Schema<IMachine>({
  sahibiId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isim: {
    type: String,
    required: [true, 'İsim alanı zorunludur']
  },
  kategori: {
    type: String,
    required: [true, 'Kategori alanı zorunludur']
  },
  modelAdi: {
    type: String,
    required: [true, 'Model alanı zorunludur']
  },
  marka: {
    type: String,
    required: [true, 'Marka alanı zorunludur']
  },
  gunlukFiyat: {
    type: Number,
    required: [true, 'Günlük fiyat alanı zorunludur']
  },
  resimUrl: {
    type: [String],
    default: ['/default-machine.jpg']
  },
  ozellikler: [{
    type: String
  }],
  durum: {
    type: String,
    enum: ['müsait', 'kirada', 'bakımda'],
    default: 'müsait'
  },
  teknikOzellikler: {
    motor: String,
    guc: String,
    kapasite: String,
    yil: Number
  },
  sehir: {
    type: String,
    required: [true, 'Şehir alanı zorunludur']
  },
  ilce: {
    type: String,
    required: [true, 'İlçe alanı zorunludur']
  },
  eklemeTarihi: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IMachine>('Machine', machineSchema); 