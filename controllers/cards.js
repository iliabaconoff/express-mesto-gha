const mongoose = require('mongoose');
const Card = require('../models/cardSchema');
const {
  INTERNAL_CODE,
  INTERNAL_ERROR,
  SUCCESS_CREATE_CODE,
  BAD_REQUEST_CODE,
  BAD_REQUEST_ERROR,
  INVAILD_ID,
  NOT_FOUND_CODE,
  NOT_FOUND_ERROR,
} = require('../utils/global');

const { ValidationError, CastError } = mongoose.Error;

const getInitialCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS_CREATE_CODE).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(BAD_REQUEST_CODE).send({ message: BAD_REQUEST_ERROR });
      } else {
        res.status(INTERNAL_CODE).send({ message: INTERNAL_ERROR });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(INVAILD_ID))
    .then((card) => res.send({ data: card }))
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

const putCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error(INVAILD_ID))
    .then((card) => res.send({ data: card }))
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

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error(INVAILD_ID))
    .then((card) => res.send({ data: card }))
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

module.exports = {
  getInitialCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
