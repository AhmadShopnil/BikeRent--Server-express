import { Request } from 'express';
import { TUserJwtPayload } from '../modules/user/user.interface';

export interface CustomRequest extends Request {
  user?: TUserJwtPayload;
}
