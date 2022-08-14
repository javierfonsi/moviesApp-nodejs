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

//movie schema
/**
 * @swagger
 * components:
 *  schemas:
 *     Movie:
 *        type: object
 *        properties:
 *          title:
 *              type: string
 *              description: This field must be identifying the movie
 *              max-length: 50 chars
 *          description:
 *              type: string
 *              description: is a synopsis of the movies
 *              max-length: 250 chars
 *          duration:
 *              type: string
 *              description: estimated movie time
 *              max-length: 50 chars
 *          rating:
 *              type: integer
 *              description: qualification
 *              max-length: 1 chars
 *          imgUrl:
 *              type: string
 *              description: link image
 *              max-length: 10 chars
 *          genre:
 *              type: string
 *              description: movie genre
 *              max-length: 50 chars
 *        required:
 *          - title
 *          - description
 *          - duration
 *          - rating
 *          - imgUrl
 *          - genre
 *        example:
 *          title: Marry Me
 *          description:  te gustará si aprecias a Jennifer López, Owen Wilson o Maluma. Comencé a ver la película sin ninguna expectativa y fue lo mejor que pude hacer
 *          duration: 1:56 min
 *          imgUrl: JLO.jpg
 *          rating: 5
 *          genre: comedy
 */

const router = express.Router();
router.use(validateSession);

router.get('/', getAllMovies);
router.post('/', userAdmin, upload.single('imgUrl'), createMovie);

router.use('/:id', moviesExist);
router.route('/:id').get(getMovieById).patch(userAdmin, updateMovie).delete(userAdmin, deleteMovie);

//Las siguiente forma no funciona sino solamente getMovieById
//router.route('/:id').get(getMovieById)
//router.use(userAdmin)
//router.patch(updateMovie)
//router.delete(deleteMovie)

module.exports = { movieRouter: router };
