const express = require('express');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
const path = require('path')

//Controllers
const { globalErrorhandler } = require('./controllers/error.controller');

//Routers
const { usersRouter } = require('./routes/user.routes');
const { reviewRouter } = require('./routes/review.routes');
const { movieRouter } = require('./routes/movie.routes');
const { actorsinmoviesRouter } = require('./routes/actorsInmovies.routes');
const { actorsRouter } = require('./routes/actor.routes');

//utils
const { AppError } = require('./utils/appError');

//swagger
const swaggerSpec = {
  definition:{
      openapi: '3.0.3',
      info: {
          title: "Movies API",
          description: "This is a simple orders delivery movies store server, based on the OpenAPI 3.0 specification. The user must be create an account and perform login, select a movie menu and see details, as reviews, it is possible add comments.", 
          contact: {
              "name": "Javier Rodrigo Fonseca Leal",
              "url": "https://portafolio-javierfonseca.netlify.app/",
              "email": "javierrfl1985@gmail.com"
            },
          version: "1.0.0"
      },
      servers: [
          {
            "url":"http://localhost:4000",
            "description": "Development server"
          },
          {
            "url": "https://moviesappbyjrfl.herokuapp.com/",
            "description": "Production server"
          },
      ]
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}

//init server
const app = express();

//import json to receive requirements in json format
app.use(express.json());

//enable multipart form/data incoming data (to receive file)
express.urlencoded({ extended: true });

//Enable cors
app.use('*', cors());

//endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/actorsinmovies', actorsinmoviesRouter);
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorhandler);

module.exports = { app };

//Claves Robert
//FIREBASE_API_KEY=AIzaSyCQsIIz34Yk9_mCpOz-4MqB7er7qvDyeyE
//FIREBASE_AUTH_DOMAIN=multer-project-3c1a7.firebaseapp.com
//FIREBASE_PROJECT_ID=multer-project-3c1a7
//FIREBASE_STORAGE_BUCKET=multer-project-3c1a7.appspot.com
//FIREBASE_MESSAGING_SENDER_ID=910055731311
//FIREBASE_APP_ID=1:910055731311:web:1ca18a93a0a6d5a32f9d9a
//FIREBASE_MEASUREMENT_ID=G-CPQ8CG6Z9W

//INFO RIVERS
//FIREBASE_API_KEY=AIzaSyDbpZn4sbulfMlZM4YjfVQiDhI1q7pN2Ag
//FIREBASE_AUTH_DOMAIN=prueba-dfad3.firebaseapp.com
//FIREBASE_PROJECT_ID=prueba-dfad3
//FIREBASE_STORAGE_BUCKET=prueba-dfad3.appspot.com
//FIREBASE_MESSAGE=925981942458
//FIREBASE_APP_ID=1:925981942458:web:31a1c9c65444c6ace75883
//FIREBASE_MEASUREMENT_ID=G-7S2LVPWSLW

//Correctas propiedades rivers
//FIREBASE_API_KEY=AIzaSyDbpZn4sbulfMlZM4YjfVQiDhI1q7pN2Ag
//FIREBASE_AUTH_DOMAIN=prueba-dfad3.firebaseapp.com
//FIREBASE_PROJECT_ID=prueba-dfad3
//FIREBASE_STORAGE_BUCKET=prueba-dfad3.appspot.com
//FIREBASE_MESSAGING_SENDER_ID=925981942458
//FIREBASE_APP_ID=1:925981942458:web:31a1c9c65444c6ace75883
//FIREBASE_MEASUREMENT_ID=G-7S2LVPWSLW

//MIAS JAVIER FONSECA
//FIREBASE_API_KEY=AIzaSyDqdRVoH8ApDx3P4uH8BPeWL-6axDskgHY
//FIREBASE_AUTH_DOMAIN=multer-project-f0ebe.firebaseapp.com
//FIREBASE_PROJECT_ID=multer-project-f0ebe
//FIREBASE_STORAGE_BUCKET=multer-project-f0ebe.appspot.com
//FIREBASE_MESSAGING_SENDER_ID=23747907749
//FIREBASE_APP_ID=1:23747907749:web:698c86ae07ad7b04a77d4c
//FIREBASE_MEASUREMENT_ID=G-1H7QEJQDCW

//MIAS JAVIER FONSECA creadas profesor
//FIREBASE_API_KEY=AIzaSyBShLh051G1x8y5OeTpyLX40O6TyXh0-50
//FIREBASE_AUTH_DOMAIN=example-a6b4e.firebaseapp.com
//FIREBASE_PROJECT_ID=example-a6b4e
//FIREBASE_STORAGE_BUCKET=example-a6b4e.appspot.com
//FIREBASE_MESSAGING_SENDER_ID=408231399471
//FIREBASE_APP_ID=1:408231399471:web:59b3fc781c8a5b097ff6da
//FIREBASE_MEASUREMENT_ID=G-1H7QEJQDCW

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//const firebaseConfig = {
//  apiKey: "AIzaSyBShLh051G1x8y5OeTpyLX40O6TyXh0-50",
//  authDomain: "example-a6b4e.firebaseapp.com",
//  projectId: "example-a6b4e",
//  storageBucket: "example-a6b4e.appspot.com",
//  messagingSenderId: "408231399471",
//  appId: "1:408231399471:web:59b3fc781c8a5b097ff6da"
//};

//// Initialize Firebase
//const app = initializeApp(firebaseConfig);
