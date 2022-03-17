const express = require('express')

const { 
    getAllReview, 
    getReviewById, 
    createReview
    } = require('../controllers/review.controller')



const router = express.Router() 

router.get('/', getAllReview)

router.get('/:id', getReviewById)

router.post('/', createReview)

module.exports = {reviewRouter: router}