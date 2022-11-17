const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { ServerRes, Message } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(ServerRes.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => new NotFoundError(Message.MOVIE_NOT_FOUND))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        return next(new ForbiddenError(Message.FORBIDDEN));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send(movie));
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
