const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  idPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostUser",
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = {Like };
