/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: ' Your api is not  correct  !!',
    error: '',
  });
};

export default notFoundRoute;
