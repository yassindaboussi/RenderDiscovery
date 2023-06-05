const { FavoritePost } = require("../models/favorite.model");
const { Like } = require("../models/like.model");
const mongoose = require("mongoose");
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const AddLike = async (req, res, next) => {
  const { idPost, idUser } = req.body;
  if (!idPost || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  Like.findOne({
    idPost: req.body.idPost,
    idUser: req.body.idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Post Already liked!" });
    } else {
      const like = new Like({
        idPost: idPost,
        idUser: idUser,
      });
      like
        .save()
        .then((user) => {
          res.status(200).json({ message: "Post Has Been liked!" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/*const FavoritefindByUser = (req, res) => {
  const idUser = req.params._id;
  Like.find({ idUser: idUser }).exec(function (
    err,
    dataFavorite
  ) {
    if (err) res.status(500).send(err);
    //else res.send(data);
    else {
      //data.idPost;
      //res.status(200).send(data[0].idPost.toString());
      //console.log(dataFavorite);
      //console.log(dataFavorite.length);
      let total = "";
      const List = [];
   
        for (let i = 0; i < dataFavorite.length; i++) {
          total = dataFavorite[i].idPost.toString();
          console.log(total);
          List.push(total);
        }
        console.log(List);
        var obj_ids = List.map(function (id) {
          return ObjectId(id);
        });
        // db.test.find({ _id: { $in: obj_ids } });
        PostAdmin.find({ _id: { $in: obj_ids } }).exec(function (
          err,
          dataPosts
        ) {
          if (err) res.status(500).send(err);
          else res.send(dataPosts);
        });
      
    }
  });
};*/
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const deleteLike = (req, res) => {
  Like.findOneAndRemove(
    { idPost:req.params.postId, idUser: req.params.userId },
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).json({ message: "Like Has been Deleted!" });
    }
  );
};
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const VerifLike = async (req, res, next) => {
  const  idPost= req.params.postId;
  const  idUser= req.params.userId ;
  if (!idPost || !idUser) {
    res.json({ error: "please add all the feilds" });
  }
  //
  Like.findOne({
    idPost: idPost,
    idUser: idUser,
  }).then((pannn) => {
    if (pannn) {
      res.status(200).json({ message: "Exist!" });
    } else {
      res.status(201).json({ message: "Not Exist!" });
    }
  });
};

const countLikesByPost = async (req, res) =>{
  const postId = mongoose.Types.ObjectId(req.params.postId);
  Like.find({ idPost: postId })
    .exec((err, likes) => {
      if (err) {
        res.status(500).json(err);
        return;
      }

      const count = likes.length;



      res.status(200).json({ count });
    });
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
module.exports = {
  AddLike,
  deleteLike,
  VerifLike,
  countLikesByPost
};
