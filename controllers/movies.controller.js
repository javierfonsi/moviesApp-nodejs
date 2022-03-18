const { Movies } = require('../models/movies.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

exports.getAllMovies = catchAsync( async ( req, res, next) => {
        const movies = await Movies.findAll({
            where: {status: 'active'} 
        })

        //if(!review){
        if(movies.length === 0){
            return next(new AppError (404, 'There are not movies until'));
        }

        res.status(201).json({
            status: 'success',
            data: {
                movies
            }
        })
})

exports.getMovieById = catchAsync( async (req, res, next) => {
        const { id } = req.params
        const movie = await Movies.findOne({
            where: {id: id, status: 'active'}
        })

        if(!movie) {
            return next(new AppError (404, `The id ${id} selected was not found`));
        }

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        })
})

exports.createMovie = catchAsync( async (req, res, next) => {
        const { title, description, duration, rating, img, genre } = req.body
        if(!title || 
            !description || 
            !duration || 
            !rating ||
            !img ||
            !genre){
                return next(new AppError (404, 'Verify the properties and their content'));
            }

        const movie = await Movies.create({
            title: title, 
            description: description, 
            duration: duration, 
            rating: rating, 
            img: img, 
            genre: genre
        })

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        })
})

exports.updateMovie = catchAsync( async (req, res, next) => {
    const { id } = req.params
    const data = filterObj(req.body, 'title', 'description', 'duration', 'rating', 'img', 'genre' )

    const movie = await Movies.findOne({
        where: {id: id, status: 'active'}
    })

    if(!movie){
        return next(
            new AppError(400, 'Must provide a valid the propeties names correctly')
        )
    }

    await movie.update({...data})
    res.status(201).json({
        status: 'success',
        message: `The movie with id ${id} was update correctly`
    })
})

exports.deleteMovie = catchAsync( async(req, res, next) => {
    const { id } = req.params
    const movie = await Movies.findOne({
        where: {id: id, status: 'active'}
    })

    if(!movie){
        return next(
            new AppError(400, 'Id not found' )
        )
    }

    await movie.update({ status: 'deleted' })
    res.status(201).json({
        status: 'success',
        message: `The Id ${id} was deleted correctly`
    })
}
)
