const knex = require("../db/connection");
const theatersService = require("./theaters.service");

async function list(req, res, next) {
  const data = await theatersService.list();
  const result = await Promise.all(
    data.map(async (theater) => {
      const movie = await theatersService.readMovies(theater.theater_id);
      theater.zip = theater.zip.toString();
      theater.movies = movie;
      return theater;
    })
  );

  res.json({ data: result });
}

module.exports = {
  list,
};
