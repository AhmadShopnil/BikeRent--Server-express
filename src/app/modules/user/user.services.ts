import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserLoginPayload, TUserLoginResponse } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken } from '../../utils/jwtUtils';

const createUserIntoDb = async (payload: TUser) => {
  const isUserexits = await User.isUserExitsByEmail(payload?.email);
  if (isUserexits) {
    throw new AppError(httpStatus.NOT_EXTENDED, 'This user already Registered');
  }

  const createdUser = await User.create(payload);
  return createdUser;
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

  return {
    accessToken,
    user: isUserexits,
  };
};

export const UserServices = {
  createUserIntoDb,
  userLogin,
};
