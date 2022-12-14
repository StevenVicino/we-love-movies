const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

async function listShowing() {
  const results = await knex("movies as m")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
  return results;
}

function read(movieId) {
  return knex("movies as m")
    .where({ "m.movie_id": movieId })
    .select("*")
    .first();
}

function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .where({ "m.movie_id": movieId })
    .select("*");
}

function getCritic(criticId) {
  return knex("critics as c").where({ "c.critic_id": criticId });
}

function readReview(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  list,
  listShowing,
  read,
  readTheaters,
  readReview,
  getCritic,
};
