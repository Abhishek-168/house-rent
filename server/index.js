import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/connect.js';
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/adminRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

if (!process.env.JWT_SECRET) {
	console.error('Fatal: JWT_SECRET is not set. Set JWT_SECRET in .env or environment.');
	process.exit(1);
}

connectDB().catch(() => process.exit(1));

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));