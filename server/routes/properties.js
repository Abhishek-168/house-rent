import express from 'express';
import { searchProperties } from '../controllers/propertyController.js';

const router = express.Router();

// GET /api/properties/search
router.get('/search', searchProperties);

export default router;
