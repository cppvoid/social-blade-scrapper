const request = require('request-promise')
const { JSDOM } = require('jsdom')

const getSiteStatistics = async (selector) => {
  let result

  try {
    const options = {
      url: 'https://socialblade.com/' + selector.site + '/channel/' + selector.username,
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
    console.log(error.message)
    console.log('could not fetch the information for ' + selector.username + ' on ' + selector.site)
    return Promise.reject(error.message)
  }

  return Promise.resolve(result)
}

module.exports = getSiteStatistics
