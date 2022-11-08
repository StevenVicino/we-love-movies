const router = require("express").Router();
const controller = require("./movies.controller");

router.route("/:movieId/reviews").get(controller.readReview);
router.route("/:movieId/theaters").get(controller.readTheaters);
router.route("/:movieId").get(controller.read);
router.route("/").get(controller.list);

module.exports = router;
