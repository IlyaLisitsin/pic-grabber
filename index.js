const rp = require('request-promise')
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const exif = require('exif-parser')

const urlGenerator = require('./urlGenerator')

const baseUrl = 'url to be here'
const options = {
    uri: baseUrl,
    transform: function (body) {
        return cheerio.load(body)
    }
}

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
    })
}

rp(options)
    .then(($) => {
        let imageUrl = $('img').attr('src')
        if (imageUrl[0] === '/') imageUrl = baseUrl + imageUrl

        const fileName = 'current-file.jpg'

        download(imageUrl, fileName, function() {
            try {
                const buffer = fs.readFileSync(__dirname + '/current-file.jpg')
                const parser = exif.create(buffer)
                const result = parser.parse()

                console.log(result)

            } catch (e) {
                console.log(e)
            }
        })
    })
    .catch((err) => {
        console.log(err)
    })