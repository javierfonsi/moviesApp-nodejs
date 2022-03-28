// Models
const { Actor } = require('../models/actors.model');
const { Movie } = require('../models/movies.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.actorExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id, status: 'active' },
    include: [{model: Movie}]
  });

  if (!actor) {
    return next(new AppError(404, `The selected actor id ${id} was not found`));
  }

  req.actor = actor;
  next();
});
