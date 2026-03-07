import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // payload should contain id, role, isApproved
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...allowedRoles) => (req, res, next) => {
  const enforceOwnerApproval = process.env.ENFORCE_OWNER_APPROVAL === 'true';
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  if (enforceOwnerApproval && req.user.role === 'Owner' && !req.user.isApproved) {
    return res.status(403).json({ message: 'Owner not approved' });
  }
  next();
};
