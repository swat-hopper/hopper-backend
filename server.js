const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const util = require('./utils/index');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');
const { config } = require('./config/index');

const User = require('./models/User')


// Initialization
const app = express();


// Config Strategy
passport.use(new GithubStrategy({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// Express and Passport Session
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Controllers



// Settings
app.set('port', config.port);


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
// Start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/usersave');
  }
);

app.get('/', function (req, res) {
  html = `<ul>
    <li><a href='/auth/github'>GitHub</a></li>
    <li><a href='/logout'>logout</a></li>
  </ul>`;

  // data fetched from github server
  if (req.isAuthenticated()) {
    html += "<p>authenticated as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  }

  res.send(html);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/protected', util.ensureAuthenticated, function(req, res) {
  res.json({auth: true, msg: 'everithing is ok'});
});

app.get('/usersave', util.ensureAuthenticated, async function(req, res, next) {
  const {user: data} = req;
  const infoUser = {
    id: data.id,
    Name: data.displayName,
    username: data.username,
    email: data.emails[0].value,
    avatar: data.photos[0].value
  }
  const email = data.emails[0].value
  console.log(email);

  const findEmail = await User.findOne({email: email})
  if(findEmail) {
    res.redirect('/protected');
  } else {
    const newUser = new User(infoUser);
    await newUser.save();
    res.status(200).json({success: 'ok', info: [info]});
  }

});

module.exports = app;