import { Request, Response, NextFunction } from 'express';
import { BikeServices } from './bike.services';
import { Bike } from './bike.model';

const addBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bikeData = req.body;
    const result = await BikeServices.addBikeInToDB(bikeData);

    // send response to client
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Bike added successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BikeServices.getAllBikeFromDB();

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bikes retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBikeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req?.params;
    const updatedData = req.body;
    const result = await BikeServices.updateBikeByIdIntoDB({
      bikeId: id,
      updatedData,
    });

    // send response to client
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bike update successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BikeController = {
  addBike,
  getAllBikes,
  updateBikeById,
};
