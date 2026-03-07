import mongoose from 'mongoose';

const { Schema } = mongoose;

const PropertySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  size: { type: Number },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  propertyType: { type: String },
  furnishingStatus: { type: String },
  amenities: [{ type: String }],
  images: [{ type: String }],
  status: { type: String, enum: ['Available', 'Booked'], default: 'Available' }
}, { timestamps: true });

PropertySchema.index({ rentAmount: 1 });
PropertySchema.index({ bedrooms: 1, bathrooms: 1, size: 1 });
PropertySchema.index({ coordinates: '2dsphere' });
PropertySchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
