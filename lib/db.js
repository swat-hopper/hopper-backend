const mongoose = require('mongoose');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const HOST = config.dbHost;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`

module.exports = {
  connection: null,
  connect: () => {
      if (this.connection) return this.connection;
      return mongoose.connect(MONGO_URI, {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true}).then(connection => {
          this.connection = connection;
          console.log('Conexion a DB exitosa');
      }).catch(err => console.log(err))
  }
}
