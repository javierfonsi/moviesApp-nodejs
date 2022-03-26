// Models
const { Movies } = require('../models/movies.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.moviesExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movies.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, `The selected movie id ${id} was not found`));
  }

  req.movie = movie;
  next();
});
