const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/users.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

dotenv.config({ path: './config.env' });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' }
  });

  //console.log(user);
  //if(!user){
  if (user.length === 0) {
    return next(new AppError(404, 'There are not users until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  //const user  = await req.user.dataValues
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    !role ||
    username.indexOf(' ') > -1 || //This field does not allow to fill it with any characters " "
    email.length < 10 || //Min lenght 10 chars
    password.length < 6 || //Min lenght 6 keys
    role.length < 4 //Min lenght 4 chars
  ) {
    return next(new AppError(404, 'Verify the properties and their content'));
  }

  //const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role
  });

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const data = filterObj(req.body, 'username', 'email');

  await user.update({ ...data });
  res.status(201).json({
    status: 'success',
    message: `The user with id ${user.id} was update correctly`
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: 'deleted' });
  res.status(201).json({
    status: 'success',
    message: `The Id ${user.id} was deleted correctly`
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { status: 'active' }
  });

  // Compare entered password vs hashed password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are invalid'));
  }

  // Create JWT
  const token = await jwt.sign(
    { id: user.id }, // Token payload
    process.env.JWT_SECRET, // Secret key
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});

//CheckToken
exports.checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

//const { id } = req.params
//const user = await User.findOne({
//    where: {id: id, status: 'active'}
//})

//if(!user){
//    return next(
//        new AppError(400, 'Id not found' )
//    )
//}

//const user = await User.findOne({where: {id: req.user.id}})
//console.log(req.user.id);
