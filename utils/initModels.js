const { User } = require('../models/users.model');
const { Actor } = require('../models/actors.model');
const { Movies } = require('../models/movies.model');

const initModels = () => {
// 1 movie <----> M Actors
  Movies.hasMany(Actor);
  Actor.belongsTo(Movies);

// 1 movie <----> M Comments
//  Movies.hasMany(Comments);
//  Actor.belongsTo(Movies);

// 1 User <----> M Reviews
  User.hasMany(Reviews);
  Reviews.belongsTo(User);

// 

  
};

module.exports = { initModels };