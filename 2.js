const LiveLook = require('./');
const fs = require('fs');

let livelook = new LiveLook({
    username: 'toadtripler',
    password: 'not my password',
    sharedFolder: './mp3s',
    autojoin: [ 'nicotine' ]
});

livelook.on('error', console.error);

livelook.login((err, res) => {
    if (err || !res.success) {
        return console.log('login failed');
    }

    livelook.on('sayChatroom', msg => {
        console.log(`[${msg.room}] <${msg.username}> ${msg.message}`);
    });

    livelook.on('messageUser', msg => {
        console.log(`<${msg.username}> ${msg.message}`);
    });

    livelook.search('hot dad web love', (err, res) => {
        if (err) {
            return console.error(err);
        }

        res = res.filter(item => item.slotsFree);

        if (!res) {
            console.log('no files found :(');
            return;
        }

        let downloaded = fs.createWriteStream('hot-dad-web-love.mp3');
        res = res.sort((a, b) => a.speed > b.speed ? -1: 0)[0];
        livelook.downloadFile(res.username, res.file).pipe(downloaded);
        downloaded.on('end', () => {
            livelook.messageUser(res.username, `hey thanks for ${res.file}!`);
        });
    });
});
