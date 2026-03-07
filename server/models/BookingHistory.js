import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookingHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  viewedOn: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.BookingHistory || mongoose.model('BookingHistory', BookingHistorySchema);
