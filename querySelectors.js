module.exports = [
  {
    site: 'youtube',
    querySelectors: [
      {
        name: 'uploads',
        colIndex: 29,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)'
      }, {
        name: 'subscribers',
        colIndex: 28,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)'
      }, {
        name: 'views',
        colIndex: 30,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)'
      }
    ]
  }, {
    site: 'twitter',
    querySelectors: [
      {
        name: 'followers',
        colIndex: 11,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)'
      }, {
        name: 'following',
        colIndex: 13,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)'
      }, {
        name: 'likes',
        colIndex: 14,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)'
      }, {
        name: 'tweets',
        colIndex: 12,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(5) > span:nth-child(3)'
      }
    ]
  }, {
    site: 'instagram',
    querySelectors: [
      {
        name: 'followers',
        colIndex: 20,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(3) > span:nth-child(3)'
      }, {
        name: 'following',
        colIndex: 22,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(4) > span:nth-child(3)'
      }, {
        name: 'uploads',
        colIndex: 21,
        querySelector: '#YouTubeUserTopInfoBlock > div:nth-child(2) > span:nth-child(3)'
      }
    ]
  }, {
    site: 'twitch',
    querySelectors: [
      {
        name: 'followers',
        colIndex: 16,
        querySelector: 'body > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)'
      }, {
        name: 'views',
        colIndex: 17,
        querySelector: 'body > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > p:nth-child(4)'
      }
    ]
  }
]
