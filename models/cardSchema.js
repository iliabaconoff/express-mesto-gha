const mongoose = require('mongoose');
const validator = require('validator');
const { VALIDATOR_URL_ERROR } = require('../utils/global');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: VALIDATOR_URL_ERROR,
      },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'user',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
