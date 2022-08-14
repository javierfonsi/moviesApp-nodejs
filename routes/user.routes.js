const express = require('express');

//Controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  checkToken
} = require('../controllers/user.controller');

//Middlewares
const { validateSession } = require('../middlewares/auth.middlewares');
const {
  userExists,
  protectAccountOwner
} = require('../middlewares/users.middlewares');

const router = express.Router();

//user schema
/**
 * @swagger
 * components:
 *  schemas:
 *     User:
 *        type: object
 *        properties:
 *          username:
 *              type: string
 *              description: This field must be identifying the user
 *              max-length: 50 chars
 *          email:
 *              type: string
 *              description: Email user
 *              max-length: 50 chars
 *          password:
 *              type: string
 *              description: password user
 *              max-length: 10 chars
 *          role:
 *              type: string
 *              description: role user
 *              max-length: 10 chars
 *        required:
 *          - username
 *          - email
 *          - password
 *          - role
 *        example:
 *          username: Jenifer_Aniston
 *          email: j.aniston@gmail.com
 *          password: 1234@admin
 *          role: user
 *     loggedUser:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              description: Email user.
 *              max-length: 50 chars
 *          password:
 *              type: string
 *              description: password user.
 *              max-length: 10 chars
 *        required:
 *          - email
 *          - password
 *        example:
 *          email: j.aniston@gmail.com
 *          password: 1234@admin
 */

//login user
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: allows login a user 
 *    tags: [User]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/loggedUser'
 *    responses:
 *      200:
 *        description: Return a valid token 
 *      404:
 *        description: Credentials are invalid.
 */

router.post('/login', loginUser);

//Create newUser
/**
 * @swagger
 * /api/v1/users/:
 *  post:
 *    summary: allows create a new user 
 *    tags: [User]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: return the info user
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      404:
 *        description: Some properties are incorrect.
 */

router.post('/', createUser);

//get all user
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all user 
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Return all user
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      404:
 *        description: There are not users util.
 */

router.use(validateSession);
router.get('/', getAllUsers);
router.get('/check-token', checkToken);

router.use('/:id', userExists);
router
  .route('/:id')

  //get user by id
/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a user by id 
 *    tags: [User] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to user id
 *    responses:
 *      200:
 *        description: Return user by id
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      404:
 *        description: The id user was not found
 */
  .get(getUserById)

//patch user by id owner
/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: allows update the data user by id 
 *    tags: [User] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to user id
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Your data user was modified correctly
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      401:
 *        description: The token was not delivered, please verified it
 *      403:
 *        description: You can´t update other users account
 *      500:
 *        description: Invalid signature
 */
  .patch(protectAccountOwner, updateUser)

//delete user by id owner
/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: allows delete the owner user  
 *    tags: [User] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to user id
 *    responses:
 *      201:
 *        description: Your user was deleted correctly
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      401:
 *        description: The token was not delivered, please verified it
 *      403:
 *        description: You can´t update other users account
 *      500:
 *        description: Invalid signature
 */  
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
