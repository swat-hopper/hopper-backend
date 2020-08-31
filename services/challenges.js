class ChallengesService {
  constructor() {
    this.Model = require('../models/Challenges');
  }

  async createChallenge({ challenge }) {
    const newChallenge = new this.Model(challenge);
    newChallenge.save()
    return newChallenge._id;
  }
}

module.exports = ChallengesService;
