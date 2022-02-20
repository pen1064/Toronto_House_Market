
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

const scraperObject = {
	url: 'https://www.zoocasa.com/toronto-on-sold-listings?page=',
	async scraper(browser){
        let soldPrice = new Array();
        let listPrice = new Array();
        let address = new Array();
        let weblink = new Array();
        let rooms = new Array();

		let page = await browser.newPage();
		
        for (let p = 501; p < 1500; p++){
            url = this.url.concat(String(p));
            console.log(`Navigating to ${url}...`);
            await page.goto(url);
            await page.waitForNavigation({waitUntil: 'networkidle0'});

            function delay(time) {
                return new Promise(function(resolve) { 
                    setTimeout(resolve, time)
                });
            }
            if (p == 501){
                const btn = await page.$$('svg.style_header-icon__3DQPR');
                btn[1].click();
                await delay(6000);
                const text1 = await page.evaluate(() => Array.from(document.querySelectorAll('div.style_disclaimer__1XoK1'), element => element.outerHTML));
                console.log(text1[0]);
                await page.$eval('input[name=email]', el => el.value = YOUR_USER_NAME);
                await page.keyboard.press('Enter');
                await page.$eval('input[name=password]', el => el.value = YOUR_PASSWORD);
                const btn2 = await page.$$('button.style_component__3bSVS.primary');
                const text = await page.evaluate(() => Array.from(document.querySelectorAll('button.style_component__3bSVS.primary'), element => element.outerHTML));                  
                btn2[3].click();
            }
            await delay(6000);
            const cookies = await page.cookies();
            const s = await page.evaluate(() => Array.from(document.querySelectorAll('.style_small__1HQt_ .style_price__e6A8i'), element => element.textContent));                  
            const f = await page.evaluate(() => Array.from(document.querySelectorAll('.style_list-price__1FQe2'), span => span.textContent));                  
            const a = await page.evaluate(() => Array.from(document.querySelectorAll('div.style_wrapper__3YAd4 p.style_street-address__1lOzV'), element => element.textContent));                  
            const l = await page.evaluate(() => Array.from(document.querySelectorAll('div.style_wrapper__3YAd4 p.style_street-address__1lOzV > a'), element => element.outerHTML.slice(34, element.outerHTML.indexOf('">')))); 
            const r = await page.evaluate(() => Array.from(document.querySelectorAll('div.style_wrapper__3YAd4 div.style_row__3NyBT p.style_listing-detail__2eH4V'), element => element.textContent));                  

            Array.prototype.push.apply(soldPrice,s);
            Array.prototype.push.apply(listPrice,f);
            Array.prototype.push.apply(weblink,l);
            Array.prototype.push.apply(address,a);
            Array.prototype.push.apply(rooms, r);
        }
                
        let scrapedData = {};
        scrapedData['sold_price'] = soldPrice;
        scrapedData['list_price'] = listPrice;
        scrapedData['address'] = address;
        scrapedData['web_link'] = weblink;

        scrapedData['bedroom'] = rooms.filter((element, index) => {
            return index % 3 === 0;
          });
        scrapedData['bathroom'] = rooms.filter((element, index) => {
            return index % 3 === 1;
          });
          scrapedData['sqft'] = rooms.filter((element, index) => {
            return index % 3 === 2;
          });         
        for (let i = 0; i < soldPrice.length; i++){}

		fs.writeFile("SP-meow.json", JSON.stringify(scrapedData), 'utf8', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("The data has been scraped and saved successfully! View it!'");
		});
	}
}
module.exports = scraperObject;