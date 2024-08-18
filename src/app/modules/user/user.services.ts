import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (payload: TUser) => {
  const createdUser = await User.create(payload);
  return createdUser;
};

export const UserServices = {
  createUserIntoDb,
};
