// Single page application
const puppeter=require('puppeteer')
const cheerio =require('cheerio')
const fs = require('fs')

const scrape=async()=>{
    const browser=await puppeter.launch({headless:false,devtools:false})
    const page=await browser.newPage()
    await page.goto('https://books.toscrape.com/',{waitUntil:'networkidle2'})
    await page.waitForSelector('h1')

    const singleElement=await page.$eval('h3',elem=>elem.textContent)
    // console.log(singleElement)
    const multiElements=await page.$$eval('h3',(elems)=>{
        return elems.map(elem=>{
            return elem.textContent
        })
    })
    // console.log(multiElements)
    const items=await page.$$eval('ol[class=row] li[class]',(elems)=>{
        return elems.map(item=>{
            return{
                title:item.querySelector('h3>a').textContent,
                price:item.querySelector('p[class=price_color]').textContent,
                image:item.querySelector('div[class=image_container] img').getAttribute('src')
            }
        })
    })
    console.log(items)
    const stringfyArr=JSON.stringify(items)
    fs.writeFile('./app2/items.txt',stringfyArr,(err)=>{
        if (err) {
            console.log(err)
        }
    })
    await browser.close()

}

scrape()