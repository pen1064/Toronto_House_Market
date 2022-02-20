const puppeteer = require('puppeteer');

const scraperObject = {
	url: 'https://www.zoocasa.com/toronto-on-sold-listings?page=1',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
        console.log('start');
        let house = document.querySelectorAll('div.style_wrapper__3YAd4 div.style_row__3NyBT p.style_listing-detail__2eH4V');
        console.log(house.length);
		
	}
}
module.exports = scraperObject

