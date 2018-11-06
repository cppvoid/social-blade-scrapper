const puppeteer = require('puppeteer');
const fs = require('fs')
const XLSX = require('xlsx')
const querySelectors = require('./querySelectors')
const getSiteStatistics = require('./getSiteStatistics')

const YOUTUBE_PROP = 'Nick Youtube'
const TWITTER_PROP = 'Nick Twitter'
const INSTAGRAM_PROP = 'Nick Instagram'
const TWITCH_PROP = 'Nick Twitch'

async function scrapeUser(browser, socialMedia, user) {

  let scrapedUser = {};

  try {
    const page = await browser.newPage();
    await page.goto(mediaPage(socialMedia, user), { waitUntil: "domcontentloaded"});

    scrapedUser = await page.evaluate(scrapeMedia, [socialMedia, user]);
    // console.log(scrapedUser)
  } catch (error) {
    console.log(error)
  }

  return Promise.resolve(scrapedUser); // Return the data
}

async function scrapeUsers(users) {

  let data = []
  let promises = [];
  const browser = await puppeteer.launch({headless: true});
  for(let i = 0; i < users.length; i++) {
    if(!users[i][YOUTUBE_PROP]) continue
    promises.push(scrapeUser(browser, 'youtube', users[i][YOUTUBE_PROP]).then( scrapedUser => data.push(scrapedUser)));

    // if(!users[i][TWITTER_PROP]) continue
    // promises.push(scrapeUser(browser, 'twitter', users[i][TWITTER_PROP]).then( scrapedUser => data.push(scrapedUser)));

    // if(!users[i][INSTAGRAM_PROP]) continue
    // promises.push(scrapeUser(browser, 'instagram', users[i][INSTAGRAM_PROP]).then( scrapedUser => data.push(scrapedUser)));

    // if(!users[i][TWITCH_PROP]) continue
    // promises.push(scrapeUser(browser, 'twitch', users[i][TWITCH_PROP]).then( scrapedUser => data.push(scrapedUser)));

    console.log('...');
  }

  await Promise.all(promises);

  browser.close();
  return data;
}

function mediaPage(socialMedia, user) {
  return `https://socialblade.com/${socialMedia}/${channelOrUser(socialMedia)}/${user}`
}

function channelOrUser( socialMedia ) {
  return socialMedia === 'youtube' ? 'channel' : 'user'
}

function scrapeMedia(argsArray) {
  const socialMedia = argsArray[0]
  const user = argsArray[1]

  function scrapeYoutube() {
    let subs = document.querySelector('#youtube-stats-header-subs');
    let views = document.querySelector('#youtube-stats-header-views');

    if(subs === null || views === null) {
      subs = document.querySelector('body > div:nth-child(12) > div:nth-child(2) > p:nth-child(3) > span:nth-child(2)');
      views = document.querySelector('body > div:nth-child(12) > div:nth-child(2) > p:nth-child(3) > span:nth-child(3)');
    }

    if( !subs || !views) {
      subs = 'error'
      views = 'error'
    } else {
      subs = subs.innerText
      views = views.innerText
    }

    return { user, socialMedia, 'Seguidores Youtube': subs, 'Views  Youtube': views }
  }
  function scrapeTwitter() {
      let followers = document.querySelector('div.YouTubeUserTopInfo:nth-child(2) > span:nth-child(3)').innerText;
      let tweets = document.querySelector('div.YouTubeUserTopInfo:nth-child(5) > span:nth-child(3)').innerText;
      return { user, socialMedia, followers, tweets };
  }
  function scrapeInstagram() {
    let followers = document.querySelector('div.stats-top-data-module:nth-child(2) > div:nth-child(2)');
    let posts = document.querySelector('div.stats-top-data-module:nth-child(4) > div:nth-child(2)');
    if(followers && posts && followers !== null && posts !== null) {
      followers = followers.innerText
      posts = posts.innerText
      return {  user, socialMedia, followers, posts }
    }
    return { user, socialMedia }
  }
  function scrapeTwitch() {
    let followers = document.querySelector('#socialblade-user-content > div:nth-child(5) > div:nth-child(13) > div:nth-child(2) > div:nth-child(2)').innerText;
    let views = document.querySelector('#socialblade-user-content > div:nth-child(5) > div:nth-child(14) > div:nth-child(3) > div:nth-child(2)').innerText;
    return { user, socialMedia, followers, views };
  }

  if(socialMedia === 'youtube') return scrapeYoutube()
  if(socialMedia === 'twitter') return scrapeTwitter()
  if(socialMedia === 'instagram') return scrapeInstagram()
  if(socialMedia === 'twitch') return scrapeTwitch()
  return null
}

const youtubeSelectors = []
const twitterSelectors = []
const instagramSelectors = []
const twitchSelectors = []
const allPromises = []

const getQuerySelectors = (username, site, rowIndex) => {

  const querySelector = querySelectors.find(querySelector => querySelector.site === site)

  const data = {
    username,
    site,
    querySelectors: querySelector.querySelectors,
    rowIndex
  }
  // console.log(data)

  return data
}

module.exports = async (path) => {
  console.log('progress')
  // 'BBDD.xlsx'
  const workbook = XLSX.readFile(path, { cellStyles: true, bookDeps: true, bookVBA: true});
  // SLO is the name of the excel page IDK why
  const SLO = XLSX.utils.sheet_to_json(workbook.Sheets.SLO)
  // const alecs = SLO[0]
  // console.log(SLO)

  SLO.forEach((row, index) => {
    if(!!row[YOUTUBE_PROP])
      youtubeSelectors.push(getQuerySelectors(row[YOUTUBE_PROP], 'youtube', index))
    if(row[TWITTER_PROP])
      twitterSelectors.push(getQuerySelectors(row[TWITTER_PROP], 'twitter', index))
    if(row[INSTAGRAM_PROP])
      instagramSelectors.push(getQuerySelectors(row[INSTAGRAM_PROP], 'instagram', index))
    if(row[TWITCH_PROP])
      twitchSelectors.push(getQuerySelectors(row[TWITCH_PROP], 'twitch', index))
  })
  
  
  const youtubeData = []
  const twitterData = []
  const instagramData = []
  const twitchData = []
  
  for( selector of youtubeSelectors) {
    allPromises.push(
      getSiteStatistics(selector).then( res => {
      youtubeData.push(res)
    }).catch( err => err))
  }
  
  for( selector of twitterSelectors) {
    allPromises.push(
      getSiteStatistics(selector).then( res => {
      twitterData.push(res)
    }).catch( err => err))
  }
  
  for( selector of instagramSelectors) {
    allPromises.push(
      getSiteStatistics(selector).then( res => {
      instagramData.push(res)
    }).catch( err => err))
  }
  
  for( selector of twitchSelectors) {
    allPromises.push(
      getSiteStatistics(selector).then( res => {
      const parsedQuerySelectors = res.querySelectors.map(querySelector => {
        const [number] = querySelector.content.trim().split(' ')
        querySelector.content = number
  
        return querySelector
      })
  
      twitchData.push({...res, parsedQuerySelectors})
    }).catch( err => err))
  }

  await Promise.all(allPromises);
  
  youtubeData.forEach(data => {
    data.querySelectors.forEach( selector => {
      const rowIndex = data.rowIndex + 1
      workbook.Sheets.SLO[XLSX.utils.encode_cell({r: rowIndex , c: selector.colIndex})] = { v: selector.content}
    })
  })

  twitchData.forEach(data => {
    data.querySelectors.forEach( selector => {
      const rowIndex = data.rowIndex + 1
      workbook.Sheets.SLO[XLSX.utils.encode_cell({r: rowIndex , c: selector.colIndex})] = { v: selector.content}
    })
  })

  twitterData.forEach(data => {
    data.querySelectors.forEach( selector => {
      console.log(data)
      const rowIndex = data.rowIndex + 1
      workbook.Sheets.SLO[XLSX.utils.encode_cell({r: rowIndex , c: selector.colIndex})] = { v: selector.content}
    })
  })

  instagramData.forEach(data => {
    data.querySelectors.forEach( selector => {
      const rowIndex = data.rowIndex + 1
      workbook.Sheets.SLO[XLSX.utils.encode_cell({r: rowIndex , c: selector.colIndex})] = { v: selector.content}
    })
  })


  // workbook.Sheets.SLO = SLO
  // XLSX.writeFile(workbook, 'workpluz.xlsx', { Props: workbook.Props })
  return workbook
} 



// main()
// console.log(workbook.Props)

// for debuging the scraping
// const alecs = require('./alecs.json')

// scrapeUsers(SLO).then( data => {
//    const updatedSLO = SLO.map( row => {

//     if(!row[YOUTUBE_PROP]) return row

//     let youtubeData = data.find( element => element.user === row[YOUTUBE_PROP] )

//     if(youtubeData) {
//       delete youtubeData.user
//       delete youtubeData.socialMedia
//       return {...row, ...youtubeData}
//     }

//     return row
//   })

//   workbook.Sheets.SLO = XLSX.utils.json_to_sheet(updatedSLO)

//   XLSX.writeFile(workbook, 'workpluz.xlsx', null)

// })

