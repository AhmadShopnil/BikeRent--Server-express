import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const UserSchema = new Schema<TUser, TUserModel>(
  {
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
  },

  {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields
  },
);

// UserSchema.pre('save', async function (next) {
//   const user = this; // this is the user

//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

UserSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or if it's new)
  if (!user.isModified('password')) {
    return next(); // Skip the hashing process
  }

  try {
    // Hash the password
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  } catch (error: any) {
    next(error);
  }
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
