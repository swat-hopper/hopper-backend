const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const util = require('./utils/index');
const { config } = require('./config/index');
const agent = require('@google-cloud/debug-agent');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const challengesApi = require('./routes/challenges')
const authApi = require('./routes/authentication')

if (!config.dev) {
  agent.start();
}

// Initialization
const app = express();

// Express and Passport Session
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Settings
app.set('port', config.port);

// Middlewares
app.use(cors());
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.get('/', function (req, res) {
  let html = `<ul>
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

// routes
authApi(app)
challengesApi(app)

// middlewares by errors
app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

module.exports = app;