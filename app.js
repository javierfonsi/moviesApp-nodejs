const express = require('express')

//Routes
const { usersRouter } = require('./routes/user.routes')
const { reviewRouter } = require('./routes/review.routes')
const { movieRouter } = require('./routes/movie.routes')
const { actorsinmoviesRouter } = require('./routes/actorsInmovies.routes')
const { actorsRouter } = require('./routes/actor.routes')

const { AppError } = require('./utils/appError')
const { globalErrorhandler } = require('./controllers/error.controller')

//init server
const app = express()

//import json
app.use(express.json())

//endpoints
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/actorsinmovies', actorsinmoviesRouter)
app.use('/api/v1/actors', actorsRouter)

app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
  });

// Error handler (err -> AppError)
app.use(globalErrorhandler);

module.exports = { app }