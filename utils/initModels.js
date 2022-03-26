const { User } = require('../models/users.model');
const { Actor } = require('../models/actors.model');
const { Movies } = require('../models/movies.model');
const { Review } = require('../models/reviews.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');

const initModels = () => {
  // 1 User <----> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 User <----> M Reviews
  Movies.hasMany(Review);
  Review.belongsTo(Movies);

  // M Movie <--> M Actor
  Movies.belongsToMany(Actor, { through: ActorsInMovies });
  Actor.belongsTo(Movies, { through: ActorsInMovies });
  //Movies.belongsToMany(Actor);
  //Actor.belongsTo(Movies);

  // 1 movie <----> M Comments
  //  Movies.hasMany(Comments);
  //  Actor.belongsTo(Movies);
};

module.exports = { initModels };
