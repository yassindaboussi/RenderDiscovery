
const mongoose = require("mongoose");


const commentaireSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostAdmin" , required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
  date: { type: Date, default: Date.now },
});

const Commentaire = mongoose.model("Commentaire", commentaireSchema);

module.exports = { Commentaire };






