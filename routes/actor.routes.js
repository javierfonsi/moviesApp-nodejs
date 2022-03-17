const express = require('express')

const { 
    getAllActors, 
    getActorsById,
    createActor 
} = require('../controllers/actor.controller')



const router = express.Router() 

router.get('/', getAllActors)

router.get('/:id', getActorsById)

router.post('/', createActor)


module.exports = {actorsRouter: router}