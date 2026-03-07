import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookingSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  tenant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  message: { type: String },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
