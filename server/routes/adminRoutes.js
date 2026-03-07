import express from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { listUsers, listProperties, listBookings } from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate);
router.use(requireRole('Admin'));

router.get('/users', listUsers);
router.get('/properties', listProperties);
router.get('/bookings', listBookings);

export default router;
