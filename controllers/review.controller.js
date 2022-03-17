const { Review } = require('../models/reviews.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync')

exports.getAllReview = catchAsync( async ( req, res, next) => {
    const review = await Review.findAll({
        where: {status: 'active'} 
    })

    //if(!review){
    if(review.length === 0){
        return next(new AppError (404, 'There are not review until'));
    }

    res.status(201).json({
        status: 'success',
        data: {
            review
        }
    })
}) 

exports.getReviewById = catchAsync( async (req, res, next) => {
        const { id } = req.params
        const review = await Review.findOne({
            where: {id: id, status: 'active'}
        })

        if(!review) {
            return next(new AppError (404, `The id ${id} selected was not found`));
        }

        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        })
})

exports.createReview = catchAsync( async (req, res, next) => {
        const { title, comment, rating, userId, movieId } = req.body
        if(!title || 
            !comment || 
            !rating || 
            !userId ||
            !movieId ){
                return next(new AppError (404, 'Verify the properties and their content'));
                }
        const review = await Review.create({
            title: title,
            comment: comment, 
            rating: rating, 
            userId: userId, 
            movieId: movieId
        })

        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        })
})