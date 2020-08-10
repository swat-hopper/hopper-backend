require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.API_KEY,
  cloud_api_secret: process.env.API_SECRET,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  secret: process.env.SECRET
};


module.exports = { config }
