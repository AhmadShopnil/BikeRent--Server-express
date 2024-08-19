import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/', BookingController.addBooking);
router.get('/', BookingController.getMyAllBooking);

export const BookingRoutes = router;
