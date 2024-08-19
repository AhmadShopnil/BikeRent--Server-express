import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
};

export type TUserLoginPayload = {
  email: string;
  password: string;
};
export type TUserLoginResponse = {
  accessToken: string;
  user: Partial<TUser>;
};

export interface TUserModel extends Model<TUser> {
  isUserExitsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
