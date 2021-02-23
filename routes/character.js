const request = require('request');
const crypto = require('crypto');

var express = require('express');
var router = express.Router();
const config = require('../utility/config');

console.log('public key' + config.publicKey);
console.log('private key' + config.privateKey);

/**
 * GET /characters?name={name}&limit={limit}
 * Returns marvel characters that start with {name} and {limit} number of results
 */
router.get('/',  (req, res) => {
  try {
    const baseUrl = 'http://gateway.marvel.com/v1/public/characters';
    const query = `?limit=${req.query.limit}&nameStartsWith=${req.query.name}`;

    const timestamp = new Date().getTime();
    const hash = crypto.createHash('md5').update(timestamp + config.privateKey + config.publicKey).digest('hex');
    const auth = `&ts=${timestamp}&apikey=${config.publicKey}&hash=${hash}`;

    const url = `${baseUrl}${query}${auth}`;
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (error, response, data) => {
      if (error) {
        console.log('Error:', error);
        res.send(error);
      } else if (response.statusCode !== 200) {
        console.log('Error', response.body);
        res.status(response.statusCode).send(response.body);
      } else {
        res.send(data.data);
      }
    });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

module.exports = router;