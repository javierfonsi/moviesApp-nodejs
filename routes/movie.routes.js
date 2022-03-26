const express = require('express');

const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller');

// Middlewares
const {
  validateSession,
  userAdmin
} = require('../middlewares/auth.middlewares');
const { moviesExist } = require('../middlewares/movies.middlewares');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();
router.use(validateSession);
router.get('/', getAllMovies);
router.post('/', userAdmin, upload.single('imgUrl'), createMovie);

router.use('/:id', moviesExist);
router.route('/:id').get(getMovieById).patch(updateMovie).delete(deleteMovie);

module.exports = { movieRouter: router };
