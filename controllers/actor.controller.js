const { Actor } = require('../models/actors.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync')

exports.getAllActors = catchAsync( async ( req, res, next) => {
        const actor = await Actor.findAll({
            where: {status: 'active'} 
        })

        //console.log(user);
        //if(!review){
        if(actor.length === 0){
            return next(new AppError (404, 'There are not actors until'));
        }

        res.status(201).json({
            status: 'success',
            data: {
                actor
            }
        })
})

exports.getActorsById = catchAsync( async (req, res, next) => {
        const { id } = req.params
        const actor = await Actor.findOne({
            where: {id: id, status: 'active'}
        })

        if(!actor) {
            return next(new AppError (404, `The id ${id} selected was not found`));
        }

        res.status(200).json({
            status: 'success',
            data: {
                actor
            }
        })
}
)
exports.createActor = catchAsync( async (req, res, next) => {
        const { name, country, rating, age, profilePic } = req.body
        if(!name || 
            !country || 
            !rating || 
            !age ||
            !profilePic ){
                return next(new AppError (404, 'Verify the properties and their content'));
                }

        const actor = await Actor.create({
            name: name, 
            country: country, 
            rating: rating, 
            age: age, 
            profilePic: profilePic
        })

        res.status(200).json({
            status: 'success',
            data: {
                actor
            }
        })
})
