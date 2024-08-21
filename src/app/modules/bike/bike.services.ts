import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const addBikeInToDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeByIdIntoDB = async ({
  bikeId,
  updatedData,
}: {
  bikeId: string;
  updatedData: Partial<TBike>;
}) => {
  const updatedBike = await Bike.findByIdAndUpdate(
    { _id: bikeId },
    { $set: updatedData },
    { new: true },
  );

  if (!updatedBike) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Bike update faild');
  }

  return updatedBike;
  //End
};

export const BikeServices = {
  addBikeInToDB,
  getAllBikeFromDB,
  updateBikeByIdIntoDB,
};
