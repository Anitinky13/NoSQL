//import
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
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
      required: true,
      maxlength: 280,
    },

    //username to have a string and required
    username: {
      type: String,
      required: true,
    },
    //createdAt to have a date, set default value to the current timestamp and use a getter method to format the timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ReactionSchema;

//this is not a model, but will be used as the reaction fields subdocument schema in the Though model
