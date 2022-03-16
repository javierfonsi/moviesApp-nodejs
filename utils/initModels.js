const { User } = require('../models/users.model');
const { Comment } = require('../models/comment.model');

const initModels = () => {
  // 1 User <----> M Reviews
  User.hasMany(Reviews);
  Reviews.belongsTo(User);

  
};

module.exports = { initModels };