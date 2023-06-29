const userRouter = require('express').Router();
const {
  getUserList,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.post('/', createUser);
userRouter.get('/', getUserList);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserData);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
