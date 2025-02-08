import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Routes
import authRoutes from './routes/authRoutes';
import machineRoutes from './routes/machineRoutes';

dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
}));

// Middleware
app.use(express.json());

// Uploads klasörünü oluştur
const uploadsPath = path.join(__dirname, '../uploads');
const machinesPath = path.join(uploadsPath, 'machines');

// Klasörlerin varlığını kontrol et ve yoksa oluştur
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
if (!fs.existsSync(machinesPath)) {
  fs.mkdirSync(machinesPath, { recursive: true });
}

// Statik dosya sunumu için uploads klasörünü ayarla
app.use('/uploads', express.static(uploadsPath));
app.use('/uploads/machines', express.static(machinesPath));

console.log('Uploads path:', uploadsPath);
console.log('Machines path:', machinesPath);

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