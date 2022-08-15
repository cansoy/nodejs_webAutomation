// Single page application
const puppeter=require('puppeteer')
const cheerio =require('cheerio')
const fs = require('fs')

const scrape=async()=>{
    const browser=await puppeter.launch({headless:false,devtools:true})
    const page=await browser.newPage()
    await page.goto('https://books.toscrape.com/',{waitUntil:'networkidle2'})
    await page.waitForSelector('h1')
    // await page.screenshot({path:'./app1/firstStep.png',fullPage:true}) //work both headless:true || false
    // await page.pdf({path:'./app1/printA2.pdf',format:'A2'}) //just work on headless:true 
    const scrapedData= await page.evaluate((()=>{
        // try one ////////////////////////////////////////////////////////////////////
        // const h1=document.querySelector('h1')
        // return h1.textContent

        // try two ////////////////////////////////////////////////////////////////////
        // const allItems=Array.from(document.querySelectorAll('ol[class=row] li[class]'))
        // console.log(allItems)
        // const nameAndPrice=allItems.map(item=>{
        //     return{
        //         name:item.querySelector('h3').textContent,
        //         price:item.querySelector('p[class=price_color]').textContent
        //     }
        // })
        // return nameAndPrice

        // try three ////////////////////////////////////////////////////////////////////
        const body=document.querySelector('body')
        return body.innerHTML

    }))
    // try for one and two
    // console.log(scrapedData)
    // try for three
    const arrTitlesAndImages=[]
    const $=cheerio.load(scrapedData)
    const titleAndImage=$('ol[class=row] li[class]')
    titleAndImage.each((i,el)=>{
        const title=$(el).find('h3>a').text()
        const image=$(el).find('div[class=image_container] img').attr('src')
        arrTitlesAndImages.push({title,image})
    })
    console.log(arrTitlesAndImages)
    const stringfyArr=JSON.stringify(arrTitlesAndImages)
    fs.writeFile('./app1/cheerio.txt',stringfyArr,(err)=>{
        if (err) {
            console.log(err)  
        }
    })
    await browser.close()
}

scrape()