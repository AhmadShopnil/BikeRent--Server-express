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
  auth(USER_ROLE.user),
  BookingController.addBooking,
);
router.get('/my', auth(USER_ROLE.user), BookingController.getMyAllBooking);
router.get('/all', auth(USER_ROLE.admin), BookingController.getAllBooking);


router.get('/byTranId/:transactionId',
  auth(USER_ROLE.user,USER_ROLE.admin), 
BookingController.getSingBookingByTranId);

router.get('/:id', auth(USER_ROLE.user,USER_ROLE.admin), BookingController.getSingBookingById);
router.delete('/:id', auth(USER_ROLE.admin), BookingController.deleteSingBookingById);
router.put('/:id/return', auth(USER_ROLE.admin), BookingController.returnBike);

export const BookingRoutes = router;
