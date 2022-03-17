const express = require('express')
const { 
    getAllMovies, 
    getMovieById, 
    createMovie
} = require('../controllers/movies.controller')


const router = express.Router() 

router.get('/', getAllMovies)

router.get('/:id', getMovieById)

router.post('/', createMovie)


module.exports = {movieRouter: router}