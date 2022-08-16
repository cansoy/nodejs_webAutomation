// multi page application
const puppeter=require('puppeteer')
const cheerio =require('cheerio')
const fs = require('fs')

const scrape=async()=>{
    const mainUrl='https://books.toscrape.com/catalogue'
    const listOfUrl=[]
    for (let index = 1; index < 51; index++) {
        const newPageUrl=`${mainUrl}/page-${index}.html`
        listOfUrl.push(newPageUrl)
    }
    const outOfTitlesAndPrices=[]
    const browser=await puppeter.launch({headless:false,devtools:false})
    const page=await browser.newPage()
    try {
        for (let index = 0; index < listOfUrl.length; index++) {
            await page.goto(listOfUrl[index],{waitUntil:'networkidle2'})
            await page.waitForSelector('h1')
            const titlesAndPrices=await page.$$eval('ol[class=row] li[class]',elems=>{
                return elems.map(item=>{
                    return{
                        title:item.querySelector('h3>a').textContent,
                        price:item.querySelector('div[class=product_price] p[class=price_color]').textContent
                    }
                })
            })
            titlesAndPrices.forEach(item=>{
                outOfTitlesAndPrices.push(item)
            })
        }
        await browser.close()
    } 
    catch (error) {
        console.log(error.originalMessage)
        await browser.close()
    }
    console.log(outOfTitlesAndPrices)
}

scrape()