

const express = require("express");
const router = express.Router();
const commentaireController = require("../controllers/commentaire.controller");

router.get("/:postId", commentaireController.getAll); 
router.post("/:postId/:userId", commentaireController.addOne); 
/*router
  .route("/:_id")
  .put(putAll)
  .get( getOne)
  .patch( patchOne)
  .delete( deleteOne);
*/


module.exports = router;
