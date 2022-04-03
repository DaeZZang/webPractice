const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const reviews = require("../controllers/reviews");

router
  .route("/")
  .get(reviews.showReview)
  .post(isLoggedIn, validateReview, reviews.createReview);

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviews.deleteReview);

module.exports = router;

// const catchAsync = require("../utils/catchAsync");
// // const { reviewSchema } = require("../schemas.js");
// // const ExpressError = require("../utils/ExpressError");
// const Campground = require("../models/campground");
// const Review = require("../models/review");
