// const res = require("express/lib/response");
const { User } = require("../models");
const Thoughts = require("../models/Thought");
const { db, populate } = require("../models/User");
//get All Users
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v -username",
      })
      .populate({
        path: "friends",
        select: "-__v -thoughts",
      })
      .select("-__v")
      // .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.Status(400).json(err);
      });
  },
  //to getONE user by Id
  getUsersById({ params }, res) {
    User.findOne({ _id: params.userId }).populate({
      path: "thoughts",
      select: "-__v -username",
    });
    populate({
      path: "friends",
      select: "-__v -thoughts",
    })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.Status(400).json(err);
      });
  },
  createUsers({ body }, res) {
    User.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //update user by id
  updateUsers({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidatora: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user was found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //delete user
  deleteUsers({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user was found with this id!" });
          return;
        }
        return dbUsersData;
      })
      .then((dbUsersData) => {
        User.updateMany(
          { _id: { $in: dbUsersData.friends } },
          { $pull: { friends: params.userId } }
        )
          .then(() => {
            Thoughts.deleteMany({ username: dbUsersData.username })
              .then(() => {
                res.json({ message: "User was deleted Successfully " });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //to add a friend
  createFriends({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: " No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //remove a friend
  removeFriends({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this Id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
module.exports = userController;
