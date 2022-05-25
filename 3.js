// https://github.com/f-hj/slsk-client/issues/56

const { promisify } = require('util');

const slsk = require('slsk-client');
const connect = promisify(slsk.connect);

const main = async () => {
    try {
        const client = await connect({
            user: 'eli5',
            pass: 'Ph0tography!'
        });
        const search = promisify(client.search);
        const download = promisify(client.download);
        console.log("searching...");
        const searchResults = await search.call(client, ({ req: 'random', timeout: 2000 }));
        console.log("search done!")
        // mine below
        console.log(searchResults)
        console.log(download)
        //
        console.log("downloading: ", searchResults[0]);
        await download({ file: searchResults[0], path: __dirname + '/random.mp3'});
        console.log("download done!");
    } catch (err) {
        console.log(err);
    }
}

main();