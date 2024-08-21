import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import {
  TUser,
  TUserJwtPayload,
  TUserLoginPayload,
  TUserLoginResponse,
} from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken } from '../../utils/jwtUtils';

const createUserIntoDb = async (payload: TUser) => {
  const isUserexits = await User.isUserExitsByEmail(payload?.email);
  if (isUserexits) {
    throw new AppError(httpStatus.NOT_EXTENDED, 'This user already Registered');
  }

  const createdUser = await User.create(payload);

  const userWithoutPassword = {
    _id: createdUser._id,
    email: createdUser.email,
    name: createdUser.name,
    role: createdUser.role,
    phone: createdUser.phone,
    address: createdUser.address,
    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  };

  return userWithoutPassword;
};

const userLogin = async (
  payload: TUserLoginPayload,
): Promise<TUserLoginResponse> => {
  const isUserexits = await User.isUserExitsByEmail(payload?.email);

  if (!isUserexits) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  }

  const isPasswordMatch = await User.isPasswordMatched(
    payload.password,
    isUserexits.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    userId: isUserexits._id,
    role: isUserexits.role,
    email: isUserexits.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Use Omit to create a new type excluding the password field
  // const { password, ...userWithoutPassword } = isUserexits;

  const userWithoutPassword = {
    _id: isUserexits._id,
    email: isUserexits.email,
    name: isUserexits.name,
    role: isUserexits.role,
    phone: isUserexits.phone,
    address: isUserexits.address,
    createdAt: isUserexits.createdAt,
    updatedAt: isUserexits.updatedAt,
  };

  return {
    accessToken,
    user: userWithoutPassword,
  };
};

const getMyProfileFormDb = async (payload: TUserJwtPayload) => {
  const isUserExist = await User.isUserExitsByEmail(payload?.email);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found Your Profile');
  }

  const result = await User.find({ email: payload?.email }).select('-password');
  return result;
  //end
};

export const UserServices = {
  createUserIntoDb,
  userLogin,
  getMyProfileFormDb,
};
