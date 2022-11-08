const knex = require("../db/connection");

function list() {
  return knex("theaters as t").select("*");
}

function readMovies(theaterId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.theater_id": theaterId })
    .select("*");
}

module.exports = {
  list,
  readMovies,
};
