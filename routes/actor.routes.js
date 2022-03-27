const express = require('express');

const {
  getAllActors,
  getActorsById,
  createActor,
  updateActor,
  deleteActor
} = require('../controllers/actor.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middlewares');

// Utils
const { upload } = require('../utils/multer');

const router = express.Router();
router.use(validateSession);
router.get('/', getAllActors);
router.post('/', upload.single('pictureProfile'), createActor);
router.get('/:id', getActorsById);
router.patch('/:id', updateActor);
router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };
