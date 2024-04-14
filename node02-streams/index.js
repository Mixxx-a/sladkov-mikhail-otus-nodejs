import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const run = async () => {
    const wordsMap = {};

    const fileReadStream = createReadStream('./Fahrenheit 451 - Ray Bradbury.txt', { encoding: 'utf8' });
    fileReadStream.on('data', (chunk) => {
        console.log('fileReadStream: chunk read with length ' + chunk.length)
    });
    fileReadStream.on('close', () => {
        console.log('fileReadStream: reading finished (closed)');
    });

    const splitTextStream = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            console.log('splitTextStream: process chunk with length ' + chunk.length);
            const splitWords = chunk.toString()
                .replace(/[&\/\\#,+()\[\]$~—%.!'"‘’“”:;*?<>{}\n]/g, ' ')
                .toLowerCase()
                .split(' ')
                .filter((value) => value !== '')
            callback(null, splitWords)
        }
    });

    const countWordsStream = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            console.log('countWordsStream: process array with length ' + chunk.length);
            const map = {};
            for (let item of chunk) {
                if (map[item] === undefined) {
                    map[item] = 1;
                } else {
                    map[item] = map[item] + 1;
                }
            }
            callback(null, map);
        }
    });

    const accumulateWordsStream = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            console.log('accumulateWordsStream: process object with length ' + Object.keys(chunk).length)
            for (let [key, value] of Object.entries(chunk)) {
                if (wordsMap[key] === undefined) {
                    wordsMap[key] = value;
                } else {
                    wordsMap[key] = wordsMap[key] + value;
                }
            }
            callback(null)
        }
    });

    const fileWriteStream = createWriteStream('result.txt');
    fileWriteStream.on('close', () => {
        console.log('fileWriteStream: closed');
    });

    await pipeline(
        fileReadStream,
        splitTextStream,
        countWordsStream,
        accumulateWordsStream
    )
    console.log('Pipeline succeeded. Start sorting and processing...');

    const numbersOfOccurrences = Object.entries(wordsMap)
        .sort(([a,], [b,]) => a < b ? -1 : 1)
        .map((value) => value[1]);
    console.log('Processing words finished. Start writing to file...')

    fileWriteStream.write(JSON.stringify(numbersOfOccurrences));
    fileWriteStream.end();
}

const main = async () => {
    await run().catch(console.error)
}

await main();