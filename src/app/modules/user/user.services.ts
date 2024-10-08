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

  const jwtPayload = {
    userId: createdUser._id,
    role: createdUser.role,
    email: createdUser.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  //

  return {
    accessToken,
    user: userWithoutPassword,
  };
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

const getAllUsersFormDb = async () => {
  const result = await User.find().select('-password');

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not Found any user from database',
    );
  }

  return result;
  //end
};
const getMyProfileFormDb = async (payload: TUserJwtPayload) => {
  const isUserExist = await User.isUserExitsByEmail(payload?.email);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found Your Profile');
  }

  const result = await User.findOne({ email: payload?.email }).select(
    '-password',
  );
  return result;
  //end
};

const updateMyProfileIntoDb = async ({
  email,
  updatedData,
}: {
  email: string;
  updatedData: Partial<TUser>;
}) => {
  const isUserExist = await User.isUserExitsByEmail(email);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'No User find to update');
  }

  // Update profile and return the updated document
  const updatedUser = await User.findOneAndUpdate(
    { email: email }, // Filter
    { $set: updatedData }, // Update operation
    { new: true, fields: '-password' }, // Options: return the updated document and exclude the password field
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Profile update failed');
  }

  return updatedUser;
  //end
};

const makeAdminformUserIntoDb = async ({ userId }: { userId: string }) => {
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { role: 'admin' } },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Faild to change user Role');
  }

  return result;
  //End
};

const deleteSignleByIdFormDB = async ({ id }: { id: string }) => {
  // checking for is bike exist or not and send response
  const isExistUser = await User.findById({ _id: id });
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not found to delete');
  }

  // deleting bike form database
  const deleteBike = await User.findByIdAndDelete({ _id: id });

  if (!deleteBike) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'User delete faild');
  }

  return isExistUser;
  //End
};

export const UserServices = {
  createUserIntoDb,
  userLogin,
  getMyProfileFormDb,
  updateMyProfileIntoDb,
  getAllUsersFormDb,
  makeAdminformUserIntoDb,
  deleteSignleByIdFormDB,
};
