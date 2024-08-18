import { Request, Response, NextFunction } from 'express';
import { BikeServices } from './bike.services';

const addBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bikeData = req.body;
    const result = await BikeServices.addBikeInToDB(bikeData);

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

export const BikeController = {
  addBike,
};
