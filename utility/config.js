var dotenv = require('dotenv');
dotenv.config();

module.exports = {

    publicKey: process.env.MARVEL_API_PUBLIC_KEY,
    privateKey: process.env.MARVEL_API_PRIVATE_KEY
  };