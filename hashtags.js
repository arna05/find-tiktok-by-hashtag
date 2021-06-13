const tiktok = require('tiktok-scraper')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
    path: '100ratatousical.csv', // output name
    header: [
      {id: 'id', title: 'ID'},
      {id: 'text', title: 'Text'},
      {id: 'createTime', title: 'CreateTime'},
      {id: 'musicName', title: 'MusicName'},
      {id: 'musicAuthor', title: 'MusicAuthor'},
      {id: 'webVideoUrl', title: 'WebVideoUrl'},
      {id: 'videoUrl', title: 'VideoUrl'},
    ]
  });

async function returnPostByHashtag(hashtag) {
    console.log('calling')
    const headers = {
        "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4215.174 Safari/537.36',
        "referer": "https://www.tiktok.com/",
        "cookie": "tt_webid_v2=6958829032738997765"
    }
    let result = await tiktok.hashtag(hashtag, options = {number: 100, filetype: `None`, headers} )
    return result
}

// input hashtag
returnPostByHashtag('ratatousical').then(function(result) {
    resultingVideos = []
    for (let key in result.collector) {
        creationTime = result.collector[key].createTime
        if (creationTime > 1597010400 && creationTime < 1607554799) {
            var data = {
            id: String(result.collector[key].id),
            text: String(result.collector[key].text),
            createTime: String(result.collector[key].createTime),
            musicName: String(result.collector[key].musicMeta.musicName),
            musicAuthor: String(result.collector[key].musicMeta.musicAuthor),
            webVideoUrl: String(result.collector[key].webVideoUrl),
            videoUrl: String(result.collector[key].videoUrl)
            }
            resultingVideos.push(data)
        }
    }
    csvWriter
    .writeRecords(resultingVideos)
    .then(()=> console.log('The CSV file was written successfully'))
})

// Begin date: August 10th 2020 - 1597010400
// End date: December 9th 2020 - 1607554799
