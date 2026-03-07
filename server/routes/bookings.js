import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { Booking, Property } from '../models/index.js';
const router = express.Router();

// POST /api/bookings/contact  -- renter contacts owner / creates a booking request
router.post('/contact', authenticate, async (req, res) => {
  try {
    const { propertyId, startDate, endDate, message } = req.body;
    if (!propertyId) return res.status(400).json({ message: 'propertyId is required' });
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    const booking = await Booking.create({ property: property._id, tenant: req.user.id, startDate: startDate || new Date(), endDate: endDate || new Date(), message, status: 'Pending' });
    return res.status(201).json({ booking });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
