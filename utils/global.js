const rateLimit = require('express-rate-limit');

// Сообщения об ошибках
const BAD_REQUEST_ERROR = 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля';
const NOT_FOUND_ERROR = 'Карточка или пользователь не найден или был запрошен несуществующий роут';
const INVAILD_ID = 'NotValidId';
const INTERNAL_ERROR = 'На сервере произошла ошибка';
const VALIDATOR_URL_ERROR = 'Введена некорректная ссылка';

// Статус-коды ошибок
const SUCCESS_CREATE_CODE = 201;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_CODE = 500;

// Конфиг ограничителя запросов
const LIMITER_CONFIG = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  SUCCESS_CREATE_CODE,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INVAILD_ID,
  INTERNAL_ERROR,
  VALIDATOR_URL_ERROR,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_CODE,
  LIMITER_CONFIG,
};
