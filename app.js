const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false}); // Launch browser
    const page = await browser.newPage(); // Open a new page
    const userName = 'hh1s2a3'
    const password = 'h1s2a31357'
    const id = '315790899'
    try {
        // Navigate to the appointment website
        await page.goto('https://e-services.clalit.co.il/onlineweb/general/login.aspx', {waitUntil: 'networkidle0'});


        // Login
        await page.waitForSelector('input[name="ctl00$cphBody$_loginView$tbUserId"]');
        await page.type('input[name="ctl00$cphBody$_loginView$tbUserId"]', id);

        await page.waitForSelector('input[name="ctl00$cphBody$_loginView$tbUserName"]');
        await page.type('input[name="ctl00$cphBody$_loginView$tbUserName"]', userName);

        await page.waitForSelector('input[name="ctl00$cphBody$_loginView$tbPassword"]');
        await page.type('input[name="ctl00$cphBody$_loginView$tbPassword"]', password);

        await page.waitForSelector('a[id="ctl00_cphBody__loginView_btnSend"]');
        await page.click('a[id="ctl00_cphBody__loginView_btnSend"]');

        // navigate into making appointment

        await page.waitForSelector('div[class="CommonOperationsImg"]');
        await page.click('div[class="CommonOperationsImg"]');


        // await page.waitForSelector('div[class="menuWrapper"]');

        const iframeSelector = 'iframe[id="ifrmMainTamuz"]';
        await page.waitForSelector(iframeSelector);

        // Get the iframe element handle
        const iframeElement = await page.$(iframeSelector);

        const iframe = await iframeElement.contentFrame();

        const elementInsideIframeSelector = 'a[id="ProfessionVisitButton"]';
        await iframe.waitForSelector(elementInsideIframeSelector);
        await iframe.click(elementInsideIframeSelector);

        const elementInsideIframeSelector2 = 'select[id="SelectedSpecializationCode"]';
        await iframe.waitForSelector(elementInsideIframeSelector2);
        await iframe.select(elementInsideIframeSelector2, '1069');

        const elementInsideIframeSelector3 = 'input[id="SelectedCityName"]';
        await iframe.waitForSelector(elementInsideIframeSelector3);
        await iframe.click(elementInsideIframeSelector3, {clickCount: 3});
        const isButtonEnabled = () => {
            const button = document.querySelector('input[class="searchButton"]');
            return !(button && button.disabled);
        }
        await iframe.waitForFunction(isButtonEnabled);


        await iframe.click('input[class="searchButton"]');

    } catch (error) {
        console.error('Error making appointment:', error);
    }
    // finally {
    //     await browser.close(); // Close the browser
    // }
})();


