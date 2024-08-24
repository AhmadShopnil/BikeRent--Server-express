import { CustomRequest } from '../../interface/CustomRequest';
import { TUserJwtPayload, TUserLoginResponse } from './user.interface';
import { UserServices } from './user.services';
import { NextFunction, Request, Response } from 'express';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const result = await UserServices.createUserIntoDb(userData);
    // send response to client
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User Registered successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginData = req.body;
    const result = await UserServices.userLogin(loginData);
    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token: result.accessToken,
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req?.user as TUserJwtPayload;

    const result = await UserServices.getMyProfileFormDb(user);

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateMyProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req?.user as TUserJwtPayload;
    const updatedData = req.body;

    const result = await UserServices.updateMyProfileIntoDb({
      email,
      updatedData,
    });

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User profile update successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  login,
  getMyProfile,
  updateMyProfile,
};
