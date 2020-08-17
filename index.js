const app = require('./server');
const DataBase = require('./lib/db');

// Connect to DataBase
DataBase.connect();

// Connect to server
const server = app.listen(app.get('port'), () => {
  console.log(`Listen http://localhost:${server.address().port}`);
})