const express = require('express')

const { 
    getAllActors, 
    getActorsById,
    createActor, 
    updateActor,
    deleteActor
} = require('../controllers/actor.controller')



const router = express.Router() 

router.get('/', getAllActors)

router.get('/:id', getActorsById)

router.post('/', createActor)

router.patch('/:id', updateActor)

router.delete('/:id', deleteActor)

module.exports = {actorsRouter: router}