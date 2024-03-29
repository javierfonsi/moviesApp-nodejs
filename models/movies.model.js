//import Datatypes
const { DataTypes } = require('sequelize');

//import DB
const { sequelize } = require('../utils/database');

const Movie = sequelize.define('movie', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false,
    require: true
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max:5,
      min:1
    }
  },
  imgUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    require: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Movie };
