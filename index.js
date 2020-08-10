const app = require('./server');

// Connect to DataBase


// Connect to server
const server = app.listen(app.get('port'), () => {
  console.log(`Listen http://localhost:${server.address().port}`);
})