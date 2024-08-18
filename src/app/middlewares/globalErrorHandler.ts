/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || ' Something wrong!';
  let errorDetails = err || {};

  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
    errorDetails,
  });
};

export default globalErrorHandler;
