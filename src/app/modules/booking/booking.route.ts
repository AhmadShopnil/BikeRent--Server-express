import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BookingController.addBooking,
);
router.get('/', auth(USER_ROLE.user), BookingController.getMyAllBooking);

export const BookingRoutes = router;
