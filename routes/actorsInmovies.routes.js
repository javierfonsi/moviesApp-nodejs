const express = require('express')

const { 
    getAllActorsInMovies, 
    getActorsInMoviesById, 
    createActorsInMovies 
} = require('../controllers/actorsinmovies.controller')



const router = express.Router() 

router.get('/', getAllActorsInMovies)

router.get('/:id', getActorsInMoviesById)

router.post('/', createActorsInMovies)


module.exports = {actorsinmoviesRouter: router}