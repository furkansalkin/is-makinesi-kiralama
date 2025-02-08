import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('Gelen kayıt isteği:', req.body);

    const { ad, soyad, email, sifre, telefon, rol } = req.body;

    // Email kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Bu email adresi zaten kullanılıyor'
      });
    }

    // Yeni kullanıcı oluşturma
    const user = new User({
      ad,
      soyad,
      email,
      sifre,
      telefon,
      rol: rol || 'kullanici'
    });

    await user.save();
    console.log('Kullanıcı başarıyla kaydedildi:', user);

    // JWT token oluşturma
    const token = jwt.sign(
      { userId: user._id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        rol: user.rol,
        telefon: user.telefon,
        createdAt: user.kayitTarihi
      }
    });
  } catch (err) {
    const error = err as Error;
    console.error('Kayıt hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Kayıt işlemi başarısız',
      error: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, sifre } = req.body;

    // Email kontrolü
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email veya şifre hatalı'
      });
    }

    // Şifre kontrolü
    const isMatch = await user.comparePassword(sifre);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email veya şifre hatalı'
      });
    }

    // JWT token oluşturma
    const token = jwt.sign(
      { userId: user._id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        ad: user.ad,
        soyad: user.soyad,
        email: user.email,
        rol: user.rol,
        telefon: user.telefon,
        createdAt: user.kayitTarihi
      }
    });
  } catch (err) {
    const error = err as Error;
    console.error('Giriş hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Giriş işlemi başarısız',
      error: error.message
    });
  }
}; 