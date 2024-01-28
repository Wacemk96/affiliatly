var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/promise', (req, res) => {
  const url = req.body.url;
  axios({
    url: url,
    method: 'get',
  })
    .then((response) => {
      const $ = cheerio.load(response.data);

      const productTitle = $('#productTitle').text().trim();
      res.json({productTitle});
    })
    .catch((err) => {
      res.status(500).json({message: err});
    });
});

router.get('/scrape', async (req, res, next) => {
  console.log("'/test' call");
  try {
    const res = await axios.get('https://api.neoscan.io/api/main_net/v1/get_all_nodes');
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
