const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    challenge: {
      type: Schema.Types.ObjectId,
      ref: "Challenges",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "Solving",
      require: true,
      enum: ["Solving", "Sent", "Approved", "Retry"],
    },
    codepenEmbedUrl: String,
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model("Challenges", ChallengeSchema);

module.exports = Challenge;
