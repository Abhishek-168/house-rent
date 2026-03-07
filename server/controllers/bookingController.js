import { Booking, Property } from '../models/index.js';

export async function contactBooking(req, res) {
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
}

export async function listOwnerBookings(req, res) {
  try {
    const ownerId = req.user.id;
    const ownerProperties = await Property.find({ owner: ownerId }).select('_id');
    const propIds = ownerProperties.map(p => p._id);
    const bookings = await Booking.find({ property: { $in: propIds } }).populate('property', 'title location').populate('tenant', 'name email');
    return res.json({ bookings });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export default { contactBooking, listOwnerBookings };
