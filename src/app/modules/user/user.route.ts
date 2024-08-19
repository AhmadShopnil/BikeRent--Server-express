import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('from test');
});

router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);

export const UserRoutes = router;
