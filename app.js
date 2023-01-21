require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./errors/handleErrors');
const { port, mongoUrl } = require('./utils/config');
const router = require('./routes');
const limiter = require('./middlewares/limiter');

const { PORT = port, MONGO_URL = mongoUrl } = process.env;
const app = express();

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
router.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
