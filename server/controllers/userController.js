import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Property, Booking } from '../models/index.js';

dotenv.config();

export async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'Renter' });
    const token = jwt.sign({ id: user._id, role: user.role, isApproved: user.isApproved }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isApproved: user.isApproved } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, isApproved: user.isApproved }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isApproved: user.isApproved } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function browseProperties(req, res) {
  try {
    const props = await Property.find({ status: 'Available' }).limit(50);
    return res.json({ properties: props });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function bookProperty(req, res) {
  try {
    const tenant = req.user.id;
    const { propertyId, startDate, endDate, message } = req.body;
    if (!propertyId) return res.status(400).json({ message: 'propertyId is required' });
    const booking = await Booking.create({ property: propertyId, tenant, startDate: startDate || new Date(), endDate: endDate || new Date(), message, status: 'Pending' });
    return res.status(201).json({ booking });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export default { signup, login, browseProperties, bookProperty };
