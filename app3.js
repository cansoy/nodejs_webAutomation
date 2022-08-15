// Single page application
const puppeter=require('puppeteer')
const cheerio =require('cheerio')
const fs = require('fs')

const scrape=async()=>{
    const browser=await puppeter.launch({headless:false,devtools:false})
    const page=await browser.newPage()
    await page.goto('https://books.toscrape.com/catalogue/page-1.html',{waitUntil:'networkidle2'})
    await page.waitForSelector('h1')
    const titlesAndPrices=await page.$$eval('ol[class=row] li[class]',elems=>{
        return elems.map(item=>{
            return{
                title:item.querySelector('h3>a').textContent,
                price:item.querySelector('div[class=product_price] p[class=price_color]').textContent
            }
        })
    })
    console.log(titlesAndPrices)

    // const page_2=await browser.newPage()
    // await page_2.goto('https://books.toscrape.com/catalogue/page-2.html',{waitUntil:'networkidle2'})
    // await page_2.waitForSelector('h1')
    // const titlesAndPrices_2=await page_2.$$eval('ol[class=row] li[class]',elems=>{
    //     return elems.map(item=>{
    //         return {
    //             title:item.querySelector('h3>a').textContent,
    //             price:item.querySelector('div[class=product_price] p[class=price_color]').textContent
    //         }
    //     })
    // })
    // console.log(titlesAndPrices_2)





}

// scrape()