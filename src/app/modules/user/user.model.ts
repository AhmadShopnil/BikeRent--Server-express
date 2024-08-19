import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const UserSchema = new Schema<TUser, TUserModel>({
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

UserSchema.pre('save', async function (next) {
  const user = this; // this is the user

  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// statics method
UserSchema.statics = {
  isUserExitsByEmail: async function (email) {
    return await User.findOne({ email: email });
  },
  isPasswordMatched: async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  },
};

export const User = model<TUser, TUserModel>('User', UserSchema);
