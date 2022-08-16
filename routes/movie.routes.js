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
 *              descr1iption: qualification
 *              max-length: 1 chars
 *          imgUrl:
 *              type: string
 *              format: base64
 *              description: link image
 *              max-length: 200 chars
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
 *          rating: 5
 *          imgUrl: MarryMe.jpg
 *          genre: comedy
 */

const router = express.Router();
router.use(validateSession);

//Get all Movies
/**
 * @swagger
 * /api/v1/movies/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all movies 
 *    tags: [Movie]
 *    responses:
 *      201:
 *        description: Return all movies
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Movies'
 *      404:
 *        description: The id movie was not found.
 */
router.get('/', getAllMovies);

//Post a new movie
/**
 * @swagger
 * /api/v1/movies:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: allows add a new movie
 *    tags: [Movie]
 *    requestBody:
 *      required: true 
 *      content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: A new movie was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 *      401:
 *        description: Unauthorized, the token was not delivered.
 *      500:
 *        description: Error, JsonWebTokenError invalid signature.
 *  
 */

router.post('/', userAdmin, upload.single('imgUrl'), createMovie);

router.use('/:id', moviesExist);

//Get Movie by Id
/**
 * @swagger
 * /api/v1/movies/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a movie by id
 *    tags: [Movie]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the id movie
 *    responses:
 *      200:
 *        description: Return actor with id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Movie'
 *      404:
 *        description: The delivered movie id was not found.
 */

//patch user by id owner
/**
 * @swagger
 * /api/v1/movies/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: allows update the info movie by id 
 *    tags: [Movie] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to id movie
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Movie'
 *    responses:
 *      201:
 *        description: The data movie was modified correctly
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Movie'
 *      401:
 *        description: The token was not delivered, please verified it
 *      403:
 *        description: You can´t update info movies
 *      500:
 *        description: Invalid signature
 */

//delete movie by id
/**
 * @swagger
 * /api/v1/movies/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: allows delete the movie by id 
 *    tags: [Movie] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to id movie
 *    responses:
 *      201:
 *        description: The id movie was deleted correctly
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Movie'
 *      401:
 *        description: The token was not delivered, please verified it
 *      403:
 *        description: You can't update info movies
 *      500:
 *        description: Invalid signature
 */  

router.route('/:id').get(getMovieById).patch(userAdmin, updateMovie).delete(userAdmin, deleteMovie);

//Las siguiente forma no funciona sino solamente getMovieById
//router.route('/:id').get(getMovieById)
//router.use(userAdmin)
//router.patch(updateMovie)
//router.delete(deleteMovie)

module.exports = { movieRouter: router };
