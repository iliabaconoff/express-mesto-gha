const userRouter = require('express').Router();
const {
  getUserList,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validateUserId,
  validateUserUpdate,
  validateUpdateAvatar,
} = require('../utils/validationConfig');

userRouter.get('/', getUserList);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUserId, getUserById);
userRouter.patch('/me', validateUserUpdate, updateUserData);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = userRouter;
