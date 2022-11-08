const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews as r")
    .where({ "r.review_id": review_id })
    .select("*")
    .first();
}

function readCritic(critic_id) {
  return knex("critics as c")
    .where({ "c.critic_id": critic_id })
    .select("*")
    .first();
}

function destroy(review_id) {
  return knex("reviews as r").where({ "r.review_id": review_id }).del();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedData) => updatedData[0]);
}

module.exports = {
  read,
  delete: destroy,
  update,
  readCritic,
};
