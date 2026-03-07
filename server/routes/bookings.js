import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { contactBooking, listOwnerBookings } from '../controllers/bookingController.js';

const router = express.Router();

// GET /api/bookings/mine  -- owner sees bookings on their properties
router.get('/mine', authenticate, listOwnerBookings);

// POST /api/bookings/contact  -- renter contacts owner / creates a booking request
router.post('/contact', authenticate, contactBooking);

export default router;
