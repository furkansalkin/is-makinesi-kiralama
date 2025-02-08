import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  ad: string;
  soyad: string;
  email: string;
  sifre: string;
  telefon: string;
  rol: 'admin' | 'kullanici' | 'makine_sahibi';
  kayitTarihi: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  ad: {
    type: String,
    required: [true, 'Ad alanı zorunludur'],
    trim: true
  },
  soyad: {
    type: String,
    required: [true, 'Soyad alanı zorunludur'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email alanı zorunludur'],
    unique: true,
    trim: true,
    lowercase: true
  },
  sifre: {
    type: String,
    required: [true, 'Şifre alanı zorunludur'],
    minlength: [6, 'Şifre en az 6 karakter olmalıdır']
  },
  telefon: {
    type: String,
    required: [true, 'Telefon alanı zorunludur'],
    trim: true
  },
  rol: {
    type: String,
    enum: ['admin', 'kullanici', 'makine_sahibi'],
    default: 'kullanici'
  },
  kayitTarihi: {
    type: Date,
    default: Date.now
  }
});

// Şifre hashleme middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('sifre')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.sifre = await bcrypt.hash(this.sifre, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Şifre karşılaştırma metodu
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.sifre);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model<IUser>('User', userSchema); 