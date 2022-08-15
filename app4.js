const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
    const urls = [
        "https://store.playstation.com/pl-pl/product/EP9000-CUSA09176_00-DAYSGONECOMPLETE",
        "https://store.playstation.com/pl-pl/product/EP9000-CUSA13323_00-GHOSTSHIP0000000",
    ];
    const browser = await puppeteer.launch({
        headless: false
    });
    for (i = 0; i < urls.length; i++) {
        const page = await browser.newPage();
        const url = urls[i];
        const promise = page.waitForNavigation({
            waitUntil: "networkidle2"
        });
        await page.goto(`${url}`);
        await promise;
        const [el] = await page.$x(
            "/html/body/div[3]/div/div/div[2]/div/div/div[2]/h2"
        );
        const txt = await el.getProperty("textContent");
        const title = await txt.jsonValue();

        const [el2] = await page.$x(
            "/html/body/div[3]/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div[1]/h3"
        );
        const txt2 = await el2.getProperty("textContent");
        const price = await txt2.jsonValue();

        console.log({
            title,
            price
        });

    }
    // browser.close();
}

scrapeProduct();