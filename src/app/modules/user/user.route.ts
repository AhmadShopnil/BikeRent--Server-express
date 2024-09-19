import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserController.createUser,
);
router.post('/login', UserController.login);

router.put(
  '/me',
  validateRequest(userValidations.updateUserValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.updateMyProfile,
);

router.put(
  '/makeAdmin/:id',

  auth(USER_ROLE.admin),
  UserController.makeAdminFormUser,
);
router.delete(
  '/:id',

  auth(USER_ROLE.admin),
  UserController.deleteSingleUserById,
);
router.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.getMyProfile,
);
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

export const UserRoutes = router;
