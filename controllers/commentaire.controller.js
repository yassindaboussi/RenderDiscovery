


const { Commentaire } = require("../models/commentaire.model");

const { User } = require("../models/user.model");
const { mongoose } = require("mongoose");

const getAll = async (req, res) =>{
  const postId = mongoose.Types.ObjectId(req.params.postId);

  Commentaire.find({ postId: postId })
    .populate("userId", "username avatar")
    .sort({ date: -1 })
    .limit(10)
    .exec((err, commentaires) => {
      if (err) {
        res.status(500).json(err);
        return;
      }

      const count = commentaires.length;



      res.status(200).json({ count, commentaires });
    });
}

const addOne = async (req, res) =>{
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
     /* if (!user || user.role !== "doctor") {
        return res.status(401).json({ message: "Not authorized" });
      }*/

      Commentaire.create({
        content: req.body.content,
        postId: req.params.postId,
        userId: req.params.userId,
      })
        .then((newComment) => {
          res.status(201).json(newComment);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding user", error: err });
    });
}

const getOne = async (req, res) => {
  Commentaire.findOne({ _id: req.params._id })
    .then((commentaire) => {
      res.status(200).json(commentaire);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

const putAll = async (req, res) =>{
  const update = {
    content: req.body.content,
  };

  Commentaire.updateOne({ _id: req.params._id }, update, { new: true })
    .then((commentaire) => {
      res.status(200).json(commentaire);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
const  patchOne = async (req, res) => {
  Commentaire.findOneAndUpdate(
    { _id: req.params._id },
    {
      content: req.body.content,
    }
  )
    .then((commentaire) => {
      res.status(200).json(commentaire);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

const deleteOne = async (req, res) =>{
  const commentaireId = req.params._id;
  const userId = req.params.userId;

  Commentaire.findById(commentaireId)
    .then((commentaire) => {
      if (!commentaire) {
        res.status(404).json({ message: "Commentaire non trouvé" });
      } else if (commentaire.userId.toString() !== userId) {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à supprimer ce commentaire",
        });
      } else {
        commentaire.remove().then(() => {
          res.status(200).json({ message: "Commentaire supprimé avec succès" });
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}



module.exports = {
  getAll,
  addOne,
  getOne,
  putAll,
  patchOne,
  deleteOne
};