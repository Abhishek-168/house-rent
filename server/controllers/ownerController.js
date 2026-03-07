import { Property } from '../models/index.js';

export async function createProperty(req, res) {
  try {
    const ownerId = req.user.id;
    const data = { ...req.body, owner: ownerId };
    const prop = await Property.create(data);
    return res.status(201).json({ property: prop });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
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
