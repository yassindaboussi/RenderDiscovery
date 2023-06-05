
const { PostAdmin } = require("../models/postadmin.model");

const { Rating } = require("../models/rating");
const { mongoose } = require("mongoose");

const ratePost = async (req, res) => {
  const { rating } = req.body;
  const postId = req.params.postId;
  const userId = req.params.userId;

  Rating.findOne({ postId, userId })
    .then((existingRating) => {
      if (existingRating) {
        existingRating.rating = rating;
        return existingRating.save();
      } else {
        const newRating = new Rating({
          postId,
          userId,
          rating,
        });
        return newRating.save();
      }
    })
    .then(async (savedRating) => {
      const ratingData = await Rating.aggregate([
        {
          $match: { postId: mongoose.Types.ObjectId(postId) },
        },
        {
          $group: {
            _id: "$postId",
            averageRating: { $avg: "$rating" },
          },
        },
        {
          $project: {
            _id: 0,
            postId: "$postId",
            averageRating: 1,
          },
        },
      ]);

      console.log(ratingData['averageRating']);

      /*if (ratingData.length === 0) {
        return res
          .status(201)
          .json({ message: "No ratings found for this doctor." });
      }*/
      PostAdmin.findOneAndUpdate(
        { _id: postId},
        { rate: ratingData[0].averageRating.toString() },
        { new: true }
      )
        .then((post) => {
          return res.status(200).json(post);
        })
        .catch((err) => {
          console.log(err);
        });


    })
    .catch((err) => {
      res.status(400).json(err);
    });
}
const getPostRatingByUserId = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  Rating.findOne({ postId, userId })
    .then((existingRating) => {
     
        res.status(200).json(existingRating);
      
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}


module.exports = {
  ratePost,
  getPostRatingByUserId
};
