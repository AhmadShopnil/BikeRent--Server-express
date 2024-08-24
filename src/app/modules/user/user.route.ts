import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('from test');
});

router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserController.createUser,
);
router.post('/login', UserController.login);

router.put(
  '/me',
  validateRequest(userValidations.updateUserValidationSchema),
  auth(USER_ROLE.user),
  UserController.updateMyProfile,
);
router.get('/me', auth(USER_ROLE.user), UserController.getMyProfile);

export const UserRoutes = router;
