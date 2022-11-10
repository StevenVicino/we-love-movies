const moviesService = require("./movies.service");

async function list(req, res, next) {
  const { is_showing } = req.query;
  if (!is_showing) {
    const data = await moviesService.list();
    res.json({ data });
  } else {
    const data = await moviesService.listShowing();
    console.log(data);
    res.json({ data });
  }
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found" });
}

async function read(req, res, next) {
  const { movie } = res.locals;
  console.log(movie);
  res.json({ data: movie });
}

async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await moviesService.readTheaters(movieId);
  res.json({ data });
}

async function readReview(req, res, next) {
  const movieId = res.locals.movie.movie_id;
  const data = await moviesService.readReview(movieId);
  const result = await Promise.all(
    data.map(async (review) => {
      const critic = await moviesService.getCritic(review.critic_id);
      review.critic = critic[0];
      return review;
    })
  );
  res.json({ data: result });
}

module.exports = {
  list,
  read: [movieExists, read],
  readTheaters: [movieExists, readTheaters],
  readReview: [movieExists, readReview],
};
