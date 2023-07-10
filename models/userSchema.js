const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../utils/responsesWithError/Unauthorized');

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, 'Поле "email" должно быть заполнено'],
      unique: [true, 'Пользователь с таким "email" уже существует'],
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    password: {
      type: String,
      select: false,
      require: [true, 'Поле "password" должно быть заполнено'],
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: true,
    },
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
          return user;
        });
    });
};

module.exports = model('user', userSchema);
