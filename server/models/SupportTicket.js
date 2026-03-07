import mongoose from 'mongoose';

const { Schema } = mongoose;

const SupportTicketSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Pending', 'Closed'], default: 'Open' },
  responses: [{ sender: { type: Schema.Types.ObjectId, ref: 'User' }, message: String, sentAt: Date }]
}, { timestamps: true });

export default mongoose.models.SupportTicket || mongoose.model('SupportTicket', SupportTicketSchema);
