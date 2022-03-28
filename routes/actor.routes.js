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

router.get('/', getAllActors);
router.get('/:id', actorExist, getActorsById);
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
