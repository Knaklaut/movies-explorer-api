const router = require('express').Router();

const { validationId, validationMovie } = require('../middlewares/validityCheck');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validationMovie, createMovie);
router.delete('/movies/_id', validationId, deleteMovie);

module.exports = router;
