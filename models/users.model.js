//import Datatypes
const { DataTypes } = require('sequelize');

//import DB
const { sequelize } = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true,
    unique: true,
    //validate: {
    //  len: [10, 20]
    //}
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    isEmail: true,
    require: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    //validate: {
    //  len: [6, 20]
    //}
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'active'
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
});

module.exports = { User };
