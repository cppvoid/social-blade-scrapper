module.exports = [
  {
    site: 'youtube',
    querySelectors: [
      {
        name: 'uploads',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)'
      }, {
        name: 'subscribers',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)'
      }, {
        name: 'views',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)'
      }
    ]
  }, {
    site: 'twitter',
    querySelectors: [
      {
        name: 'followers',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)'
      }, {
        name: 'following',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)'
      }, {
        name: 'likes',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)'
      }, {
        name: 'tweets',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(6) > span:nth-child(3)'
      }
    ]
  }, {
    site: 'instagram',
    querySelectors: [
      {
        name: 'followers',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)'
      }, {
        name: 'following',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)'
      }, {
        name: 'uploads',
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)'
      }
    ]
  }, {
    site: 'twitch',
    querySelectors: [
      {
        name: 'followers',
        querySelector: 'body > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)'
      }, {
        name: 'views',
        querySelector: 'body > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > p:nth-child(4)'
      }
    ]
  }
]
