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

export const BikeServices = { addBikeInToDB, getAllBikeFromDB };
