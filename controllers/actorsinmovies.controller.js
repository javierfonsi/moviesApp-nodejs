const { ActorsInMovie } = require('../models/actorsInMovies.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllActorsInMovies = catchAsync(async (req, res, next) => {
  const actorsinmovies = await ActorsInMovies.findAll({
    //where: {status: 'active'}
  });

  //console.log(user);
  //if(!review){
  if (actorsinmovies.length === 0) {
    return next(new AppError(404, 'There are not actorsInMovies until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      actorsinmovies
    }
  });
});

exports.getActorsInMoviesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actorsinmovies = await ActorsInMovie.findOne({
    //where: {id: id, status: 'active'}
    where: { id: id }
  });

  if (!actorsinmovies) {
    return next(new AppError(404, `The id ${id} selected was not found`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      actorsinmovies
    }
  });
});

exports.createActorsInMovies = catchAsync(async (req, res, next) => {
  const { actorId, movieId } = req.body;
  if (!actorId || !movieId) {
    return next(new AppError(404, 'Verify the properties and their content'));
  }
  const actorsinmovies = await ActorsInMovie.create({
    actorId: actorId,
    movieId: movieId
  });

  res.status(200).json({
    status: 'success',
    data: {
      actorsinmovies
    }
  });
});
