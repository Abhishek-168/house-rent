import mongoose from 'mongoose';

const { Schema } = mongoose;

const SavedSearchSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  criteria: { type: Schema.Types.Mixed, required: true },
  notify: { type: Boolean, default: true },
  lastNotifiedAt: { type: Date }
}, { timestamps: true });

export default mongoose.models.SavedSearch || mongoose.model('SavedSearch', SavedSearchSchema);
