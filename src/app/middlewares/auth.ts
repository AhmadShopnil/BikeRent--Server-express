import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { TUserJwtPayload, TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/user/user.model';
import { CustomRequest } from '../interface/CustomRequest';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // if not have any token
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorised! , token not found',
        );
      }

      // checking if the given token is valid
      let decodedData;

      try {
        decodedData = jwt.verify(
          token,
          config.jwt_access_secret as string,
        ) as JwtPayload;
      } catch (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorised');
      }

      const { role, email } = decodedData;

      // checking if the user actually exist or not
      const isUserExist = await User.isUserExitsByEmail(email);
      if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }

      // checking if the user is authorised based on role
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }
      req.user = decodedData as TUserJwtPayload;
      next();

      // end
    },
  );
};

export default auth;
