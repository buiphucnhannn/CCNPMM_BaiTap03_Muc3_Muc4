import jwt from 'jsonwebtoken';
import env from '../config/environment.js';

export const verifyToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;
    const token = req.cookies?.token || bearerToken;

    if (!token) {
      return res.status(401).json({ message: 'B?n chua dang nh?p' });
    }

    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = {
      id: payload.id,
      role: payload.role,
    };

    return next();
  } catch {
    return res.status(401).json({ message: 'Token không h?p l? ho?c dã h?t h?n' });
  }
};

export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  const currentRole = (req.user?.role || '').toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

  if (!normalizedAllowedRoles.includes(currentRole)) {
    return res.status(403).json({ message: 'B?n không có quy?n truy c?p tài nguyên này' });
  }

  return next();
};

