const slsk = require('slsk-client')
slsk.connect({
    user: 'eli5',
    pass: 'Ph0tography!'
}, (err, client) => {
    client.search({
        req: 'random',
        timeout: 2000
    }, (err, res) => {
        if (err) return console.log(err)
        res = [
            {
                user: 'poulet',
                file: '@@poulet-files/random.mp3',
                size: 6437362,
                slots: true,
                bitrate: 320,
                speed: 1251293
            }
        ]
        client.download({
            file: res[0],
            path: __dirname + '/random.mp3'
        }, (err, data) => {
            //can res.send(data.buffer) if you use express
        })
    })
})
