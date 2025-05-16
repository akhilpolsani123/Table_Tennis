import mongoose, { Schema } from 'mongoose';

export interface ITip {
  player1: string;
  player2: string;
  league: string;
  tip: string;
  status: 'free' | 'pro';
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const tipSchema = new Schema<ITip>({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  league: { type: String, required: true },
  tip: { type: String, required: true },
  status: { type: String, enum: ['free', 'pro'], default: 'free' },
  date: { type: String, required: true },
}, {
  timestamps: true
});

export const Tip = mongoose.models.Tip || mongoose.model<ITip>('Tip', tipSchema); 