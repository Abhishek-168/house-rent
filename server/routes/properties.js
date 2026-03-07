import express from 'express';
import { Property } from '../models/index.js';
const router = express.Router();

// GET /api/properties/search
router.get('/search', async (req, res) => {
  try {
    const { location, minPrice, maxPrice, bedrooms, amenities, lat, lng, radius = 5000, page = 1, limit = 20, sort } = req.query;
    const q = { status: 'Available' };
    if (location) q.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) q.rentAmount = {};
    if (minPrice) q.rentAmount.$gte = Number(minPrice);
    if (maxPrice) q.rentAmount.$lte = Number(maxPrice);
    if (bedrooms) q.bedrooms = Number(bedrooms);
    if (amenities) q.amenities = { $all: amenities.split(',').map(a => a.trim()) };

    let aggregate = Property.find(q);

    if (lat && lng) {
      aggregate = Property.find({
        ...q,
        coordinates: {
          $near: {
            $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
            $maxDistance: Number(radius)
          }
        }
      });
    }

    if (sort === 'price_asc') aggregate = aggregate.sort({ rentAmount: 1 });
    else if (sort === 'price_desc') aggregate = aggregate.sort({ rentAmount: -1 });
    else aggregate = aggregate.sort({ createdAt: -1 });

    const skip = (Number(page) - 1) * Number(limit);
    const items = await aggregate.skip(skip).limit(Number(limit)).exec();
    const total = await Property.countDocuments(q);
    return res.json({ total, page: Number(page), limit: Number(limit), items });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
