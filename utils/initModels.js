//models

const { User } = require("../models/users.model");
const { Actor } = require("../models/actors.model");
const { ActorsInMovie } = require("../models/actorsInMovies.model");
const { Movie } = require("../models/movies.model");
const { Review } = require("../models/reviews.model");


const initModels = () => {
  // 1 User <----> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 User <----> M Reviews
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  // M Movie <--> M Actor
  Movie.belongsToMany(Actor, { through: ActorsInMovie });
  Actor.belongsToMany(Movie, { through: ActorsInMovie });

};

module.exports = { initModels };
