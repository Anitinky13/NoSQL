//import
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = require("./Reaction");
//thoughtText to have String, Required, Must be between 1 and 280 characters
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: " Thought is required",
      maxlength: 250,
      minlength: 1,
    },
    //createdAt to have Date, set default value to the current timestamp, use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      //using a getter method to format timestamp
      get: (timestamp) => dateFormat(timestamp),
    },
    //username to have a string and required
    username: {
      type: String,
      requires: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//reactions to have an array of nested documents created with the reactionSchema

//create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

model.exports = Thought;
