const express = require('express');

const {
  getAllReview,
  getReviewById,
  createReview
} = require('../controllers/review.controller');

const router = express.Router();

//Middlewares
const { validateSession } = require('../middlewares/auth.middlewares');

//review schema
/**
 * @swagger
 * components:
 *  schemas:
 *     review:
 *        type: object
 *        properties:
 *          username:
 *              title: string
 *              description: This field must be identifying the user
 *              max-length: 50 chars
 *          comment:
 *              type: string
 *              description: Comment user
 *              max-length: 50 chars
 *          rating:
 *              type: string
 *              description: Accordingo to id movie 
 *          userId:
 *              type: integer
 *              description: Id user
 *          movieId:
 *              type: integer
 *              description: Id movies
 *        required:
 *          - username
 *          - comment
 *          - rating
 *          - userId
 *          - movieId
 *        example:
 *          username: Jenifer_Aniston
 *          comment: Fantastic movie
 *          rating: 4
 *          userId: 1
 *          movieId: 1
 */

router.use(validateSession);

//get all review
/**
 * @swagger
 * /api/v1/reviews:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all review 
 *    tags: [review]
 *    responses:
 *      201:
 *        description: Return all review
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/review'
 *      404:
 *        description: There are not reviews util.
 */

router.get('/', getAllReview);

//get review by id
/**
 * @swagger
 * /api/v1/reviews/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a review by id 
 *    tags: [review] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to id review
 *    responses:
 *      200:
 *        description: Return review by id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/review'
 *      404:
 *        description: There are not reviews until
 */
router.get('/:id', getReviewById);

//Create new review
/**
 * @swagger
 * /api/v1/reviews/:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: allows create a new reviews 
 *    tags: [review]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/review'
 *    responses:
 *      200:
 *        description: review created succesfully, return the info review
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/review'
 *      404:
 *        description: Some properties are incorrect.
 */
router.post('/', createReview);

module.exports = { reviewRouter: router };
