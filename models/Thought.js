//import
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// const ReactionSchema = require("./Reaction");
const ReactionSchema = new Schema(
  {
    //schema only

    //reactionId to use mongooses objectId data type and default value is set to a new objectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    //reactionBody to have a string, required, and 280 character maximum
    reactionBody: {
      type: String,
      required: "Enter your reaction",
      minLength: 2,
      maxlength: 280,
    },

    //username to have a string and required
    username: {
      type: String,
      required: "Enter your username",
    },
    //createdAt to have a date, set default value to the current timestamp and use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValidator) => dateFormat(createdAtValidator),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//thoughtText to have String, Required, Must be between 1 and 280 characters
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: " Thought is required",
      trim: true,
      maxlength: 250,
      minlength: 2,
    },
    //createdAt to have Date, set default value to the current timestamp, use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      //using a getter method to format timestamp
      get: (createdAtValidator) => dateFormat(createdAtValidator),
    },
    //username to have a string and required
    username: {
      type: String,
      required: "Enter username",
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
ThoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

model.exports = Thought;
