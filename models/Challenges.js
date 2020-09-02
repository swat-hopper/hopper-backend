const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    challengeInfo: {
      title: { type: String, maxlength: 280, require: true },
      description: { type: String, maxlength: 280, require: true },
      tips: { type: Array },
      url: { type: String, require: true },
      difficulty: { type: String, enum: ['easy','medium','hard'], require: true },
    },
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;
