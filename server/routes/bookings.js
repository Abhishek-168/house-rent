import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { contactBooking } from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings/contact  -- renter contacts owner / creates a booking request
router.post('/contact', authenticate, contactBooking);

export default router;
