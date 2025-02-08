import express, { Request, Response } from 'express';
import Machine from '../models/Machine';
import { authMiddleware } from '../middleware/authMiddleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Resim yükleme konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const uploadPath = path.join(__dirname, '../../uploads/machines');
    // Klasörün varlığını kontrol et ve yoksa oluştur
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Sadece resim dosyaları yüklenebilir!'));
  }
});

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    rol: string;
  };
  files?: {
    [fieldname: string]: Express.Multer.File[];
  } | Express.Multer.File[];
}

// Makine ekleme
router.post('/', authMiddleware, upload.array('resimler', 5), async (req: AuthRequest, res: Response) => {
  try {
    console.log('Gelen makine verisi:', req.body);
    console.log('Kullanıcı:', req.user);

    const files = Array.isArray(req.files) ? req.files : [];
    const resimUrls = files.map(file => `/uploads/machines/${file.filename}`) || ['/default-machine.jpg'];

    const makine = new Machine({
      ...req.body,
      sahibiId: req.user?.userId,
      modelAdi: req.body.model,
      resimUrl: resimUrls
    });

    await makine.save();
    console.log('Makine kaydedildi:', makine);

    res.status(201).json({ success: true, data: makine });
  } catch (err) {
    const error = err as Error;
    console.error('Makine ekleme hatası:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Tüm makineleri listeleme
router.get('/', async (req: Request, res: Response) => {
  try {
    const makineler = await Machine.find().populate('sahibiId', 'ad soyad');
    res.json({ success: true, data: makineler });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rastgele makineleri getir
router.get('/random', async (req: Request, res: Response) => {
  try {
    const count = parseInt(req.query.count as string) || 3;
    const makineler = await Machine.aggregate([
      { $match: { durum: 'müsait' } },
      { $sample: { size: count } }
    ]);
    res.json({ success: true, data: makineler });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
});

// Kullanıcının kendi makinelerini listeleme
router.get('/my-machines', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const makineler = await Machine.find({ sahibiId: req.user.userId });
    res.json({ success: true, data: makineler });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
});

// Makine detayı getirme
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const makine = await Machine.findById(req.params.id).populate('sahibiId', 'ad soyad telefon email');
    if (!makine) {
      return res.status(404).json({ success: false, message: 'Makine bulunamadı' });
    }
    res.json({ success: true, data: makine });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
});

// Makine güncelleme
router.put('/:id', authMiddleware, upload.array('resimler', 5), async (req: AuthRequest, res: Response) => {
  try {
    console.log('Gelen form verisi:', req.body);
    console.log('Gelen dosyalar:', req.files);

    const makine = await Machine.findOne({ _id: req.params.id, sahibiId: req.user?.userId });
    if (!makine) {
      return res.status(404).json({ success: false, message: 'Makine bulunamadı veya bu işlem için yetkiniz yok' });
    }

    // Form verilerini kontrol et
    if (!req.body.isim || !req.body.kategori || !req.body.marka || !req.body.model) {
      return res.status(400).json({ success: false, message: 'Gerekli alanlar eksik' });
    }
    
    // Mevcut resimleri al
    let existingImages: string[] = [];
    try {
      existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    } catch (error) {
      console.error('Mevcut resimler parse hatası:', error);
      existingImages = [];
    }
    
    // Yeni yüklenen resimlerin URL'lerini oluştur
    const files = Array.isArray(req.files) ? req.files : [];
    const yeniResimUrls = files.map(file => `/uploads/machines/${file.filename}`);
    
    // Tüm resimleri birleştir
    const tumResimler = [...existingImages, ...yeniResimUrls];

    // Teknik özellikleri parse et
    let teknikOzellikler = {};
    try {
      teknikOzellikler = req.body.teknikOzellikler ? JSON.parse(req.body.teknikOzellikler) : {};
    } catch (error) {
      console.error('Teknik özellikler parse hatası:', error);
      teknikOzellikler = {};
    }
    
    // Form verilerini güncelle
    const guncellenecekVeriler = {
      isim: req.body.isim,
      kategori: req.body.kategori,
      marka: req.body.marka,
      model: req.body.model,
      gunlukFiyat: req.body.gunlukFiyat,
      sehir: req.body.sehir,
      ilce: req.body.ilce,
      teknikOzellikler,
      resimUrl: tumResimler
    };
    
    // Makineyi güncelle
    Object.assign(makine, guncellenecekVeriler);
    await makine.save();
    
    console.log('Makine güncellendi:', makine);
    res.json({ success: true, data: makine });
  } catch (err) {
    const error = err as Error;
    console.error('Güncelleme hatası:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Makine silme
router.delete('/:id', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const makine = await Machine.findOneAndDelete({ _id: req.params.id, sahibiId: req.user.userId });
    if (!makine) {
      return res.status(404).json({ success: false, message: 'Makine bulunamadı veya bu işlem için yetkiniz yok' });
    }
    res.json({ success: true, data: makine });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router; 