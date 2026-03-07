import express from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { createProperty, updateProperty, deleteProperty, listOwnerProperties } from '../controllers/ownerController.js';

const router = express.Router();

router.use(authenticate);
router.use(requireRole('Owner'));

router.post('/', createProperty);
router.get('/', listOwnerProperties);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;
