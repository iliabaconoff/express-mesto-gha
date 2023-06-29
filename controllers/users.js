const mongoose = require('mongoose');
const User = require('../models/userSchema');
const {
  INTERNAL_CODE,
  BAD_REQUEST_CODE,
  BAD_REQUEST_ERROR,
  NOT_FOUND_CODE,
  NOT_FOUND_ERROR,
  INTERNAL_ERROR,
  INVAILD_ID,
  SUCCESS_CREATE_CODE,
} = require('../utils/global');

const { ValidationError, CastError } = mongoose.Error;

const getUserList = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error(INVAILD_ID))
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_ERROR });
      } else if (err.message === INVAILD_ID) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ERROR });
      } else {
        res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((userData) => res.status(SUCCESS_CREATE_CODE).send({ data: userData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(BAD_REQUEST_CODE).send({ message: err.message });
      } else {
        res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR });
      }
    });
};

const updateUserData = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error(INVAILD_ID))
    .then((updatedUserData) => {
      if (updatedUserData) {
        res.send({ data: updatedUserData });
      } else {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ERROR });
      }
    })
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        res.status(BAD_REQUEST_CODE).send({ message: err.message });
      } else if (err.message === INVAILD_ID) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ERROR });
      } else {
        res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error(INVAILD_ID))
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        res.status(BAD_REQUEST_CODE).send({ message: err.message });
      } else if (err.message === INVAILD_ID) {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ERROR });
      } else {
        res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR });
      }
    });
};

module.exports = {
  getUserList,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
};
