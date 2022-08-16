const express = require('express');

const {
  getAllActorsInMovies,
  getActorsInMoviesById,
  createActorsInMovies
} = require('../controllers/actorsinmovies.controller');

const router = express.Router();

const { validateSession } = require('../middlewares/auth.middlewares');
router.use(validateSession);

//user actorsinmovie
/**
 * @swagger
 * components:
 *  schemas:
 *     actorsinmovies:
 *        type: object
 *        properties:
 *          actorId:
 *              type: integer
 *              description: This field must be id actor
 *          movieId:
 *              type: integer
 *              description: This field must be id movie
 *        required:
 *          - actorId
 *          - movieId
 *        example:
 *          actorId: 1
 *          movieId: 1
 */


//get all actorsinmovies
/**
 * @swagger
 * /api/v1/actorsinmovies:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all actorsinmovies 
 *    tags: [actorsinmovies]
 *    responses:
 *      201:
 *        description: returns all actorsinmovies
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/actorsinmovies'
 *      404:
 *        description: There are not actorsinmovies util.
 */

router.get('/', getAllActorsInMovies);

//get actorsinmovies by id
/**
 * @swagger
 * /api/v1/actorsinmovies/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns an actorsinmovies by id 
 *    tags: [actorsinmovies] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to id actorsinmovies
 *    responses:
 *      200:
 *        description: Return actorsinmovies by id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/actorsinmovies'
 *      404:
 *        description: The id actorsinmovies was not found
 */
router.get('/:id', getActorsInMoviesById);

//Create actorsinmovies
/**
 * @swagger
 * /api/v1/actorsinmovies/:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: allows create a new actorinmovies 
 *    tags: [actorsinmovies]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/actorsinmovies'
 *    responses:
 *      200:
 *        description: return the info actorsinmovies
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      404:
 *        description: Some properties are incorrect.
 */
router.post('/', createActorsInMovies);

module.exports = { actorsinmoviesRouter: router };
