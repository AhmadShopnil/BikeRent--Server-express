import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import AppError from '../errors/AppError';
import { TErrorMessages } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';

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
    const errorsimplifiyErrorMessages = handleZodError(err);
    message = errorsimplifiyErrorMessages?.message;

    statusCode = errorsimplifiyErrorMessages?.statusCode;

    errorMessages = errorsimplifiyErrorMessages?.errorMessages;
  } else if (err?.name === 'CastError') {
    const errorsimplifiyErrorMessages = handleCastError(err);
    statusCode = errorsimplifiyErrorMessages?.statusCode;
    message = errorsimplifiyErrorMessages?.message;
    errorMessages = errorsimplifiyErrorMessages?.errorMessages;
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

  // final response
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
