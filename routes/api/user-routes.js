const router = require("express").Router();
//Get all users
//get a single user by its _id and  populated thought and friend data
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  createFriends,
  removeFriends,
} = require("../../controllers/user-controller");
//POST a new user:

router.route("/users").get(getAllUsers).post(createUsers);

//PUT to update a user by its _id

//DELETE to remove user by its _id

//bonus a users associated thoughts when deleted

///api/users/:userId/friends/:friendId
//POST to add a new friend to a users friend list
//DELETE to remove a friend from a users friend list

router
  .route("/users/:userId")
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

router
  .route("/users/:userId/friends/:friendsId")
  .post(createFriends)
  .delete(removeFriends);

module.exports = router;
