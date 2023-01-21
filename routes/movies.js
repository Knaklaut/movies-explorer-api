const router = require('express').Router();

const { validationId, validationMovie } = require('../middlewares/validityCheck');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validationMovie, createMovie);
router.delete('/:movieId', validationId, deleteMovie);

module.exports = router;
