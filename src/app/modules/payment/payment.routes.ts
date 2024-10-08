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


router.post(
    '/success/:tran_id',
    PaymentController.paymentSuccess
);

router.post(
    '/failed/:tran_id',
    PaymentController.paymentFailed
);
// router.post(
//     '/cancel',
//     PaymentController.initPayment
// );




export const PaymentRoutes = router;

