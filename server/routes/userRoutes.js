import express from 'express';
import { signup, login, browseProperties, bookProperty } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/properties', browseProperties);
router.post('/book', authenticate, bookProperty);

export default router;
