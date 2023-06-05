const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like.controller");

router.post("/AddLike", LikeController.AddLike);
router.delete("/DeleteLike/:postId/:userId", LikeController.deleteLike);
router.get("/VerifLike/:postId/:userId", LikeController.VerifLike);
router.get("/CountLikes/:postId", LikeController.countLikesByPost);
//

module.exports = router;
