class ChallengesService {
  constructor() {
    this.Model = require('../models/Challenges');
  }

  async createChallenge({ challenge }) {
    const newChallenge = new this.Model(challenge);
    newChallenge.save();
    return newChallenge._id;
  }

  async getChallenges(params) {
    let { difficulty = '', page = 1, limit = 10 } = params;

    return new Promise((resolve, reject) => {
      let filter = {};
      if (difficulty) {
        filter = { 'challengeInfo.difficulty': difficulty };
      }

      this.Model.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('owner', 'displayName username avatar')
        .exec((err, populated) => {
          if (err) {
            reject(err);
            return false;
          }

          resolve(populated);
        });
    });
  }
}

module.exports = ChallengesService;
