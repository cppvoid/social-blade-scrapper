const request = require('request-promise')
const { JSDOM } = require('jsdom')

const getSiteStatistics = async (selector, timeout = false) => {

  let result
  const path = selector.site === 'youtube' ? '/channel/' : '/user/'
  try {
    const options = {
      url: 'https://socialblade.com/' + selector.site + path + selector.username,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
      }
    }

    const html = await request(options)
    const dom = new JSDOM(html)

    const querySelectorsWithContent = selector.querySelectors.map(currentSelector => {
      return {
        ...currentSelector,
        content: dom.window.document.querySelector(currentSelector.querySelector).textContent
      }
    })

    result = {
      ...selector,
      querySelectors: querySelectorsWithContent
    }

  } catch(error) {
    // retry
    if(error.message === 'Error: socket hang up' || error.message === 'Error: read ECONNRESET') {
      console.log(error.message + ' trying again')
      return getSiteStatistics(selector)
    }
    console.log('could not fetch the information for ' + selector.username + ' on ' + selector.site)
    console.log(error.message)

    return Promise.reject(error.message)
  }

  return Promise.resolve(result)
}

module.exports = getSiteStatistics
