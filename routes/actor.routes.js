const express = require('express');

const {
  getAllActors,
  getActorsById,
  createActor,
  updateActor,
  deleteActor
} = require('../controllers/actor.controller');
const { actorExist } = require('../middlewares/actor.middlewares');

// Middlewares
const { validateSession, userAdmin } = require('../middlewares/auth.middlewares');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();
router.use(validateSession);


//Actor schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     Actor:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: This field must be identifying the actor.
 *              max-length: 100 chars
 *          country:
 *              type: string
 *              description: Nationality actor.
 *              max-length: 50 chars
 *          rating:
 *              type: integer
 *              description: rating actor.
 *              max-length: 10 chars
 *          age:
 *              type: integer
 *              description: age actor.
 *              max-size: 10 chars
 *          profilePic:
 *              type: string
 *              description: image actor.
 *              max-length: 200 chars
 *        required:
 *          - name
 *          - country
 *          - rating
 *          - age
 *          - profilepic
 *        example:
 *          name: Jenifer Lopez
 *          country: EE.UU
 *          rating: 5
 *          age: 53
 *          profilePic: JLO.jpg 
 */

//Get all Actors
/**
 * @swagger
 * /api/v1/actors/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all actors 
 *    tags: [Actor]
 *    responses:
 *      200:
 *        description: Return all actor
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Actor'
 *      404:
 *        description: The id actor was not found.
 */

router.get('/', getAllActors);

//Get Actors by Id
/**
 * @swagger
 * /api/v1/actors/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a actor by id
 *    tags: [Actor]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the Actor user id
 *    responses:
 *      200:
 *        description: Return actor with id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/Actor'
 *      404:
 *        description: The delivered id was not found.
 */
router.get('/:id', actorExist, getActorsById);

//Post a new actor
/**
 * @swagger
 * /api/v1/actors:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: allow add a new actor
 *    tags: [Actor]
 *    requestBody: 
 *      content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  format: uuid
 *                country:
 *                  type: string
 *                  format: uuid
 *                rating:
 *                  type: integer
 *                  format: uuid
 *                age:
 *                  type: integer
 *                  format: uuid
 *                profilePic:
 *                  type: string
 *                  format: binary
 *    responses:
 *      201:
 *        description: new actor was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 *  
 */
router.post('/', userAdmin, upload.single('pictureProfile'), createActor);


router
  .use('/:id', userAdmin, actorExist)
  .route('/:id', actorExist)
router.route('/:id')
  .patch( userAdmin, updateActor)
  .delete( userAdmin, deleteActor)
//router.patch('/:id', updateActor);
//router.delete('/:id', );

module.exports = { actorsRouter: router };
