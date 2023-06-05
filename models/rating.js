


const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostAdmin", required: true },
  userId: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },

  date: { type: Date, default: Date.now },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = { Rating };
