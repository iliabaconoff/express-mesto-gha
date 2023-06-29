const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const mongoDB = 'mongodb://127.0.0.1:27017/mestodbIlya';

const { NOT_FOUND_ERROR, NOT_FOUND_CODE, LIMITER_CONFIG } = require('./utils/global');

mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

const app = express();

app.use(express.json());

// Защита сервера
app.use(LIMITER_CONFIG);
app.use(helmet());

// Хардкод авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '649a13d65441030c5370fc22',
  };

  next();
});

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_ERROR });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
