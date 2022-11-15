require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { generalProcessor, notFoundProcessor } = require('./middlewares/errProcessor');
const URL_LIST = require('./utils/urls');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors({ origin: URL_LIST }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(notFoundProcessor);
app.use(errorLogger);
app.use(errors());
app.use(generalProcessor);

app.listen(PORT);
