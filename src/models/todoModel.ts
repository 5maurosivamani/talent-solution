import { Schema, model, Document } from 'mongoose';
import { IUser } from './userModel';

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: IUser['_id'];  // Reference to the user who owns the to-do item
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Todo = model<ITodo>('Todo', todoSchema);

module.exports = Todo;
