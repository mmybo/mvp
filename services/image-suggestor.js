// This service is useful for the product-request form
// Based on input text you give it, it returns links to related images

const Scraper = require('image-scraper');
var scraper = new Scraper();

const getImages = (text) => new Promise((resolve, reject) => {
    /* This link is wack but it works  */
    scraper.address = `https://www.bing.com/images/search?q=${text}&go=Search&qs=n&form=QBILPG&sp=-1&pq=ipad&sc=8-4&sk=&cvid=DA601CA3F37C4006819E8E3B200DE187`;

    let images = [];
    scraper.on("image", (image) => {
        images.push(image.address);
    });

    scraper.on("end", () => {
        resolve(images);
    });

    scraper.on("error", reject);

    scraper.scrape();

});

module.exports = { getImages }