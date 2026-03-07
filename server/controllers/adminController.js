import { User, Property, Booking } from '../models/index.js';

export async function listUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function listProperties(req, res) {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    return res.json({ properties });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function listBookings(req, res) {
  try {
    const bookings = await Booking.find().populate('property tenant');
    return res.json({ bookings });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export default { listUsers, listProperties, listBookings };
