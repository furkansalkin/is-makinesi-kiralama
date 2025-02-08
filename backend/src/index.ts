import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import machineRoutes from './routes/machineRoutes';
import path from 'path';

// Çevresel değişkenleri yükle
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Statik dosya servisi için uploads klasörünü ayarla
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads/machines', express.static(path.join(__dirname, '../uploads/machines')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);

// Ana route
app.get('/', (req, res) => {
  res.json({ message: 'Fullstack API çalışıyor!' });
});

// Global hata yakalayıcı
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global hata:', err);
  res.status(500).json({ error: 'Sunucu hatası', details: err.message });
});

const startServer = async () => {
  try {
    // Veritabanı bağlantısı
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI çevresel değişkeni tanımlanmamış!');
    }

    console.log('MongoDB bağlantısı başlatılıyor...');
    console.log('Bağlantı URL:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('MongoDB\'ye başarıyla bağlandı');

    // Port ayarı
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
    });
  } catch (error: any) {
    console.error('Sunucu başlatma hatası:', error.message);
    if (error.name === 'MongoServerSelectionError') {
      console.error('MongoDB bağlantı detayları:', error.reason);
    }
    process.exit(1);
  }
};

startServer(); 