const scrapedin = require('scrapedin')
const crawl = require('./crawler')


module.exports = function scrapping(config){
  scrapedin(config)
      .then((profileScraper) => crawl(config,profileScraper, config.rootProfiles))
};

