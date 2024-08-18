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

export const UserController = { createUser };
