const GithubStrategy = require('passport-github');
const passport = require('passport');
const { config } = require('../../../config');
const init = require('./init');
const User = require('../../../models/User');

passport.use(
  new GithubStrategy(
    {
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: 'https://hopper-1.uc.r.appspot.com/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = {
        id: profile.id,
        displayName: profile._json.name,
        username: profile.username,
        email: profile._json.email,
        avatar: profile.photos[0].value,
      };

      const searchQuery = {
        username: user.username,
      };

      const findUsername = await User.findOne(searchQuery);
      if (findUsername) {
        return done(null, user);
      } else {
        const newUser = new User(user);
        if (newUser.displayName === null) {
          newUser.displayName = '';
        }
        if (newUser.email === null) {
          newUser.email = '';
        }
        await newUser.save();

        return done(null, user);
      }
    }
  )
);

init();
