const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require("../../controllers/thought-controller");
// const { update } = require("../../models/User");
// /api/thoughts
router.route("/thought").get(getAllThoughts).post(createThoughts);
//GET to get all thoughts
router
  .route("/thought/:thoughtId")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);
//GET to get a single thought by its _id
//POST to create a new thought (dont forget to push the created thoughts _id to the associated users thoughts array field
//PUT to update a thought by its _id
//DELETE to remove a thought by its _id)
router.route("/thought/:thoughtId/reactions").post(createReactions);
//   .get(getThoughtById)
//   .put(updateThought)
//   .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/thought/:thoughtId/reactions/:reactionId")
  .delete(deleteReactions);
//POST to create a reaction stored in a single thoughts reaction array field
//DELETE to pull and remove a reaction by the reactions reactionId value

module.exports = router;
