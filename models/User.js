//import
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//username need to have a string, Unique, Required, Trimmed
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Please enter a username, it is required!",
      trim: true,
    },
    //email to have String, required, Unique, match a valid email address(look into Mongooses matching validation)
    email: {
      type: String,
      unique: true,
      required: "Please enter a valid email address, it is required!",
      // match:
      validate: {
        validator(validateEmail) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(
            validateEmail
          );
        },
        message: "Enter a valid email address",
      },
    },
    //thoughts to have an array of _id values referencing the Though model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //friends to have an array of _id values referencing the User model(self reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//create a virtual called friendCount that retrieves the length of the users friends array field on query
UserSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});
const User = model("User", UserSchema);

module.exports = User;
