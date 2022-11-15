const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при попытке добавления фильма.'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => new NotFoundError('Запрошенный фильм не найден.'))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        return next(new ForbiddenError('Удаление фильма запрещено.'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
