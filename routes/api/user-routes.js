const router = require("express").Router();
//Get all users
//get a single user by its _id and  populated thought and friend data
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");
//POST a new user:

router.route("/").get(getAllUse).post(createUser);

//PUT to update a user by its _id

//DELETE to remove user by its _id

//bonus a users associated thoughts when deleted

///api/users/:userId/friends/:friendId
//POST to add a new friend to a users friend list
//DELETE to remove a friend from a users friend list

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
