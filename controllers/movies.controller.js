const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { Actor } = require('../models/actors.model');
const { Movie } = require('../models/movies.model');
const { Review } = require('../models/reviews.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { storage } = require('../utils/firebase');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movie = await Movie.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Actor
        //attributes: { exclude: ['actorsinmovies'] }
      }
    ]
    //, 
    //No sirve, revisar con Robert
  });

  if (movie.length === 0) {
    return next(new AppError(404, 'There are not movies until'));
  }

  // Promise[]
  const moviesPromises = movie.map(
    async ({
      id,
      title,
      description,
      duration,
      imgUrl,
      rating,
      createdAt,
      updatedAt,
      genre,
      actors,
      reviews
    }) => {
      const imgRef = ref(storage, imgUrl);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        title,
        description,
        duration,
        imgUrl: imgDownloadUrl,
        rating,
        createdAt,
        updatedAt,
        genre,
        actors,
        reviews
      };
    }
  );

  const resolvedMovies = await Promise.all(moviesPromises);

  const moviesMapeado = resolvedMovies.map((movie) => {
    movie.actorsinmovies = null;
    return movie;
  });
  //console.log(moviesMapeado);

  res.status(201).json({
    status: 'success',
    data: {
      movies: moviesMapeado
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  //const { movie } = req;
  const { id } = req.movie;
  const movieSelected = await Movie.findOne({
    where: {id, status: 'active'}, include: [{model : Actor}]  
  }) 
  res.status(200).json({
    status: 'success',
    data: {
      movieSelected
    }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, imgUrl, genre} =
    req.body;
  if (!title || !description || !duration || !rating || !genre) {
    return next(new AppError(404, 'Verify the properties and their content'));
  }

  // Upload img to Cloud Storage (Firebase)
  const imgRef = ref(storage, `imgs/${Date.now()}-${req.file.originalname}`);
  const result = await uploadBytes(imgRef, req.file.buffer);

  const movie = await Movie.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    imgUrl: result.metadata.fullPath,
    genre: genre
  });

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;
  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'img',
    'genre'
  );

  await movie.update({ ...data });
  res.status(201).json({
    status: 'success',
    message: `The selected movie with id ${movie.id} was update correctly`
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;
  await movie.update({ status: 'deleted' });
  res.status(201).json({
    status: 'success',
    message: `The selected movie with id ${movie.id} was deleted correctly`
  });
});
