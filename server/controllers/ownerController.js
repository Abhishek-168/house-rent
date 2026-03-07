import { Property } from '../models/index.js';
import mongoose from 'mongoose';

export async function createProperty(req, res) {
  try {
    const ownerId = req.user?.id || req.user?._id || req.user?.userId;
    if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(401).json({ message: 'Invalid owner token. Please login again.' });
    }

    const { title, location, rentAmount } = req.body;
    if (!title || !location || rentAmount === undefined || Number.isNaN(Number(rentAmount))) {
      return res.status(400).json({ message: 'title, location and valid rentAmount are required' });
    }

    const data = { ...req.body, owner: ownerId, rentAmount: Number(rentAmount) };

    // Persist coordinates only when valid GeoJSON Point is provided.
    const hasValidCoordinates =
      data.coordinates &&
      data.coordinates.type === 'Point' &&
      Array.isArray(data.coordinates.coordinates) &&
      data.coordinates.coordinates.length === 2 &&
      data.coordinates.coordinates.every((n) => Number.isFinite(Number(n)));

    if (hasValidCoordinates) {
      data.coordinates = {
        type: 'Point',
        coordinates: data.coordinates.coordinates.map((n) => Number(n))
      };
    } else {
      delete data.coordinates;
    }
    const prop = await Property.create(data);
    return res.status(201).json({ property: prop });
  } catch (err) {
    console.error('ownerController.createProperty error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function updateProperty(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;
    const prop = await Property.findOneAndUpdate({ _id: id, owner: ownerId }, req.body, { new: true });
    if (!prop) return res.status(404).json({ message: 'Property not found or not owned by you' });
    return res.json({ property: prop });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteProperty(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;
    const prop = await Property.findOneAndDelete({ _id: id, owner: ownerId });
    if (!prop) return res.status(404).json({ message: 'Property not found or not owned by you' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function listOwnerProperties(req, res) {
  try {
    const ownerId = req.user.id;
    const props = await Property.find({ owner: ownerId });
    return res.json({ properties: props });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export default { createProperty, updateProperty, deleteProperty, listOwnerProperties };
