import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidations } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(bookingValidations.createBookingValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  BookingController.addBooking,
);
router.get('/', auth(USER_ROLE.user), BookingController.getMyAllBooking);
router.put('/:id/return', auth(USER_ROLE.admin), BookingController.returnBike);

export const BookingRoutes = router;
