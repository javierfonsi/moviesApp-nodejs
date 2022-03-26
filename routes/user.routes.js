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

router.post('/login', loginUser);
router.post('/', createUser);

router.use(validateSession);
router.get('/', getAllUsers);
router.get('/check-token', checkToken);

router.use('/:id', userExists);
router
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
