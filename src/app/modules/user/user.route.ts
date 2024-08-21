import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('from test');
});

router.post('/signup', UserController.createUser);
router.post('/login', UserController.login);
router.get('/me', auth(USER_ROLE.user), UserController.getMyProfile);
router.put('/me', auth(USER_ROLE.user), UserController.updateMyProfile);

export const UserRoutes = router;
