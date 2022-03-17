const { User } = require('../models/users.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    where: { status: 'active' }
  });

  //console.log(user);
  //if(!user){
  if (user.length === 0) {
    return next(new AppError (404, 'There are not users until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError (404, `The id ${id} selected was not found`));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username , email, password, role } = req.body;
  if(!username || 
    !email || 
    !password || 
    !role ||
    username.indexOf(" ") > -1 || //This field does not allow to fill it with a characters " "
    email.length < 10 || 
    password.length < 6 || 
    role.length < 4){
        return next(new AppError (404, 'Verify the properties and their content'));
        }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role
  });


  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
