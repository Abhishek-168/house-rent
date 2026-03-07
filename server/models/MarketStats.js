import mongoose from 'mongoose';

const { Schema } = mongoose;

const MarketStatsSchema = new Schema({
  areaKey: { type: String, required: true },
  areaType: { type: String, default: 'neighbourhood' },
  period: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'monthly' },
  startDate: { type: Date },
  endDate: { type: Date },
  avgPrice: { type: Number },
  medianPrice: { type: Number },
  count: { type: Number, default: 0 },
  changePercent: { type: Number },
  raw: { type: Schema.Types.Mixed }
}, { timestamps: true });

MarketStatsSchema.index({ areaKey: 1, period: 1, startDate: -1 });

export default mongoose.models.MarketStats || mongoose.model('MarketStats', MarketStatsSchema);
