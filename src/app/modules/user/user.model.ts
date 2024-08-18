import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

export const UserSchema = new Schema<TUser>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

export const User = model<TUser>('User', UserSchema);
