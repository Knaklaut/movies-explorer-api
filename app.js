require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { generalProcessor, badReqProcessor, notFoundProcessor } = require('./middlewares/errProcessor');
const { Message } = require('./utils/constants');
const { urlList, port, mongoUrl } = require('./utils/config');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');

const { PORT = port, MONGO_URL = mongoUrl, URL_LIST = urlList } = process.env;
const app = express();

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.use(cors({ origin: URL_LIST }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(Message.CRASH_TEST);
  }, 0);
});
app.use(routes);
app.use(badReqProcessor);
app.use(notFoundProcessor);
app.use(errorLogger);
app.use(errors());
app.use(generalProcessor);

app.listen(PORT);
