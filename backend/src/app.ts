import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Routes
import authRoutes from './routes/authRoutes';
import machineRoutes from './routes/machineRoutes';

dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: ['https://is-makinesi-kiralama.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Statik dosyalar için uploads klasörünü açıyoruz
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

// MongoDB bağlantısı
const MONGODB_URI = process.env.MONGODB_URI || '';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
  })
  .catch((error) => {
    console.error('MongoDB bağlantı hatası:', error);
  });

export default app; 