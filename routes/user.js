const userRouter = require('express').Router();
const {
  getUserList,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { validateUserId } = require('../utils/validationConfig');

userRouter.get('/', getUserList);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUserId, getUserById);
userRouter.patch('/me', updateUserData);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
