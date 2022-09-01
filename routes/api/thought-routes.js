const router = require("express").Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");
const { update } = require("../../models/User");
// /api/thoughts
router.route("/").get(getAllThought).post(createThought);
//GET to get all thoughts
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);
//GET to get a single thought by its _id
//POST to create a new thought (dont forget to push the created thoughts _id to the associated users thoughts array field
//PUT to update a thought by its _id
//DELETE to remove a thought by its _id)
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);
//POST to create a reaction stored in a single thoughts reaction array field
//DELETE to pull and remove a reaction by the reactions reactionId value
router.route("/:thoughtId/reactions/:reactionId").delete(removeReply);

module.exports = router;
