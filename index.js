const puppeteer = require('puppeteer');

let myCar = {
    make: 'audi',
    model: 'a3',
    extraField: '',
    minYear: 1991,
    maxYear: 2006,
    minPrice: 500,
    maxPrice: 5000
}

scrapeAll(myCar);

async function scrapeAll(myCar) {
    await auto24(myCar);
    await okidoki(myCar);
    await kuldneBors(myCar);
    await soov(myCar);
}

async function auto24(myCar) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15');
    
        let make = myCar['make'];
        let model = myCar['model'];
        let minYear = myCar['minYear'];
        let maxYear = myCar['maxYear'];

        //let url = 'https://www.auto24.ee/' + make + '#' + model;

        let url = 'https://www.auto24.ee/kasutatud/nimekiri.php?b=32&ae=2&bw=103&f2=' + maxYear + '&f1=' + minYear;
    
        await page.goto(url);
  
        await page.waitForSelector('#usedVehiclesSearchResult-flex');
        const resultsElem = await page.$('#usedVehiclesSearchResult-flex');

        //Remove ads.
        await resultsElem.evaluate(() => document.getElementById("xScroll-UvBetweenSearchResult").remove());
       
        await resultsElem.screenshot({path: 'output/auto24_' + make + '-' + model + '.png'});

        await browser.close();

    } catch(e) {
        console.log('error was: ', e)
    }
    
}

async function soov(myCar) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15');

        let make = myCar['make'];
        let model = myCar['model'];
        let extraField = myCar['extraField'];
        let url = 'https://www.soov.ee/keyword-' + make + '+' + model + '+' + extraField + '/listings.html';
        await page.goto(url);
        
        await page.waitForSelector('.adds-wrapper');
        const resultsElem = await page.$('.adds-wrapper');
        await resultsElem.screenshot({path: 'output/soov_' + make + '-' + model + '-' + extraField + '.png'});

        await browser.close();

    } catch(e) {
        console.log('error was: ', e)
    }
}

async function kuldneBors(myCar) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15');

        let make = myCar['make'];
        let model = myCar['model'];
        let extraField = myCar['extraField'];
        let minPrice = myCar['minPrice'];
        let maxPrice = myCar['maxPrice'];
        
        let url = 'https://www.kuldnebors.ee/search/search.mec?pob_evt=onpagesize&pob_action=search&pob_page_index=1&pob_page_size=100&pob_page_index_bot=1&pob_page_size_bot=25&search_evt=onsearch&search_O_string=' 
        + make + '+' + model + '+' + extraField + '&search_O_price_from=' + minPrice + '&search_O_price_to=' + maxPrice + '&search_O_deal_type=M';
        await page.goto(url);
        
        await page.waitForSelector('#postlist');
        const resultsElem = await page.$('#postlist');
        await resultsElem.screenshot({path: 'output/kuldneBörs_' + make + '-' + model + '-' + extraField + '.png'});

        await browser.close();

    } catch(e) {
        console.log('error was: ', e)
    }
}

async function okidoki(myCar) {
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15');

        let make = myCar['make'];
        let model = myCar['model'];
        let extraField = myCar['extraField'];
        let minPrice = myCar['minPrice'];
        let maxPrice = myCar['maxPrice'];
        
        let url = 'https://www.okidoki.ee/buy/all/?fsort=2&photosonly=1&price_from_value=' + minPrice + '&price_to_value=' + maxPrice + '&query=' + make + '%20' + model + '%20' + extraField;
        await page.goto(url);
        
        await page.waitForSelector('#category-big-list');
        const resultsElem = await page.$('#category-big-list');
        await resultsElem.screenshot({path: 'output/okidoki_' + make + '-' + model + '-' + extraField + '.png'});

        await browser.close();

    } catch(e) {
        console.log('error was: ', e)
    }
}



