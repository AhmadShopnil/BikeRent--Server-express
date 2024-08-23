import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import AppError from '../errors/AppError';
import { TErrorMessages } from '../interface/error';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default values for error
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;

    statusCode = simplifiedError?.statusCode;

    errorMessages = simplifiedError?.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
