var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/scrape', async (req, res) => {
  const url = req.body.url;
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const title = $('#centerCol #productTitle').text().trim();
    const brand = $('#centerCol #bylineInfo').text().trim();
    const rating = $('#centerCol #averageCustomerReviews #acrPopover span a i span').text().trim();
    const totalSell = $('#centerCol #social-proofing-faceout-title-tk_bought').text().trim();
    const price = $('.a-offscreen').text();
    const features = [];
    $('#centerCol #feature-bullets ul li span').each((index, element) => {
      features.push($(element).text().trim());
    });
    const imageUrl = $('#imgTagWrapperId img').attr('src');
    const scrapedData = {
      title,
      brand,
      rating,
      totalSell,
      price,
      features,
      imageUrl,
    };

    res.json(scrapedData);
  } catch (error) {
    console.error('Error scraping data:', error.message);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
