import express from 'express';
import { BikeController } from './bike.controller';

const router = express.Router();

router.post('/', BikeController.addBike);
router.get('/', BikeController.addBike);

export const BikeRoutes = router;
