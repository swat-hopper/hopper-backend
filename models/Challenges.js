const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    challengeInfo: {
      title: { type: String, maxlength: 280, require: true },
      description: { type: String, maxlength: 280, require: true },
      tips: { type: Array },
      url: { type: String, require: true },
    },
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model("Challenges", ChallengeSchema);

module.exports = Challenge;
