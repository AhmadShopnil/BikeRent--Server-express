import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';

import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/ipn', PaymentController.validate)

router.post(
    '/init',
    auth(USER_ROLE.user),
    PaymentController.initPayment
);



export const PaymentRoutes = router;

