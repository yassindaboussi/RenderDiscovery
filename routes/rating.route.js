const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");


///////////////////////////////////////////////////////
router.post("/ratePost/:postId/:userId", ratingController.ratePost);
router.get("/getRate/:postId/:userId", ratingController.getPostRatingByUserId);
 // Show All

module.exports = router;