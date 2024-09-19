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
const getSingleBikeFromDbById = async ({ bikeId }: { bikeId: string }) => {
  const result = await Bike.findById({ _id: bikeId });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike record not found');
  }
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
const deleteBikeByFormDB = async ({ bikeId }: { bikeId: string }) => {
  // checking for is bike exist or not and send response
  const isExistBike = await Bike.findById({ _id: bikeId });
  if (!isExistBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike Not found to delete');
  }

  // deleting bike form database
  const deleteBike = await Bike.findByIdAndDelete({ _id: bikeId });

  if (!deleteBike) {
    throw new AppError(httpStatus.NOT_MODIFIED, 'Bike delete faild');
  }

  return isExistBike;
  //End
};

export const BikeServices = {
  addBikeInToDB,
  getAllBikeFromDB,
  updateBikeByIdIntoDB,
  deleteBikeByFormDB,
  getSingleBikeFromDbById,
};
