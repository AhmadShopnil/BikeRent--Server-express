import express from 'express';
import { BikeController } from './bike.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.put('/:id', BikeController.updateBikeById);
router.delete('/:id', BikeController.deleteBikeById);
router.post('/', auth(USER_ROLE.admin), BikeController.addBike);
router.get('/', BikeController.getAllBikes);

export const BikeRoutes = router;
