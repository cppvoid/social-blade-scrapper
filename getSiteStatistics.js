const request = require('request-promise')
const { JSDOM } = require('jsdom')

const getSiteStatistics = async (selector) => {
  try {
    const options = {
      url: 'https://socialblade.com/' + selector.site + '/user/' + selector.username,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
      }
    }

    const html = await request(options)
    const dom = new JSDOM(html)

    selector.querySelectors = selector.querySelectors.map(currentSelector => {
      return {
        ...currentSelector,
        content: dom.window.document.querySelector(currentSelector.querySelector).textContent
      }
    })

    return selector

  } catch(error) {
    console.log(error.message)
    console.log('could not fetch the information for ' + selector.username + ' on ' + selector.site)
    return selector
  }
}
