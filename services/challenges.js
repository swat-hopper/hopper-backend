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

  async getChallenge(id) {
    return new Promise((resolve, reject) => {
      this.Model.findById(id)
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

  async editChallenge({ challengeId, challenge }) {
    let query = { _id: challengeId };
    await this.Model.updateOne(query, challenge);
    let challengeUpdated = this.Model.findOne(query);
    return challengeUpdated;
  }
}

module.exports = ChallengesService;
