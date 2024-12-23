import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';

interface IRateLimit {
  userId:IUser['_id'] ;
  timestamps: Date[];
}

const rateLimitSchema = new Schema<IRateLimit>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamps: { type: [Date], required: true },
});

export const RateLimit = mongoose.model<IRateLimit>('RateLimit', rateLimitSchema);
