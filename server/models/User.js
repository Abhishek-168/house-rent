import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['Renter', 'Owner', 'Admin', 'Agent'], default: 'Renter' },
  isApproved: { type: Boolean, default: false },
  profileImage: { type: String },
  currentLocation: { type: String }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
