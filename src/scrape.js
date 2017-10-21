const cheerio = require('cheerio')
const spawn = require('child_process').spawn
const url = process.argv[2]
const fs = require('fs')
const child = spawn('phantomjs', [
  'render.js',
   url
])

let html = ''

child.stdout.on('data', (data) => {
  html += data
})

child.on('exit', (code) => {
  scrapeJSON(html)
  .then((data) => {
    savePlaylist({
      link: url,
      tracks: data
    })
  })
})

let scrapeJSON = (html) => {
  return new Promise((resolve, reject) => {
    let result = []
    let $ = cheerio.load(html)
    $('.song-wrap').each((i, elem) => {
      let $ = cheerio.load(elem)
      result.push({
        title: $('.title > a').text(),
        img: $('.art > img').attr('src'),
        meta: $('em.meta').text(),
        link: $('.title > a').attr('href')
      })
    })
    resolve(result)
  })
}

let savePlaylist = (data) => {
  fs.writeFile('playlist.json', JSON.stringify(data))
}
