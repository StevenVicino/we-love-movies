const knex = require("../db/connection");
const reviewsService = require("./reviews.service");

async function reviewExists(req, res, next) {
  const reviewId = req.params.reviewId;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found" });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await reviewsService.update(updatedReview);
  updatedReview.critic = await reviewsService.readCritic(
    updatedReview.critic_id
  );
  console.log(updatedReview);
  res.json({ data: updatedReview });
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
