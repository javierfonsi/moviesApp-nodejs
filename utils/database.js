const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: '' + process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB,
  dialect: 'postgres',
  logging: false
  ,
     dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false
     }
   }
});

module.exports = { sequelize };


// para hacer el deploy en heroku, se debe subir a github el archivo creado con nombre procfile, así como descomentar las lineas 14 al 20 de esta hoja.

// instrucciones para hacer el deploy de un proyecto de backend en heroku
// 1. acceder al link de heroku y seleccionar la opcion