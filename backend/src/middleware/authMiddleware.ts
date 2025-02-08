import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar';

interface JwtPayload {
  userId: string;
  email: string;
  rol: string;
}

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Token'ı header'dan al
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Yetkilendirme başarısız: Token bulunamadı' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN" formatından TOKEN kısmını al
    if (!token) {
      return res.status(401).json({ success: false, message: 'Yetkilendirme başarısız: Geçersiz token formatı' });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;

    next();
  } catch (err) {
    const error = err as Error;
    return res.status(401).json({ success: false, message: 'Yetkilendirme başarısız: ' + error.message });
  }
}; 