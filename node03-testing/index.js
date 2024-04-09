#!/usr/bin/env node
import yargs from 'yargs'
import {hideBin} from "yargs/helpers"
import fs from 'fs';
import {sep} from 'path';

const printDirContent = (path, currentDepth, maxDepth) => {
    // check if dir contains anything
    if (!isDirContainsAnything(path)) return;

    // setup current indent
    let indent = '';
    for (let i = 0; i < currentDepth; i++) {
        indent = indent.concat('│ ');
    }

    // handle items
    const items = fs.readdirSync(path);
    let i = 0;
    for (; i < items.length - 1; i++) {
        const currPath = path + sep + items[i];
        console.log(indent + '├──' + items[i]);

        // if it is dir and need to go deeper
        if (isDir(currPath) && currentDepth !== maxDepth) {
            printDirContent(currPath, currentDepth + 1, maxDepth);
        }
    }

    //handle last element
    const currPath = path + sep + items[i];
    // if it is dir, not empty and need to go deeper
    if (isDir(currPath) && isDirContainsAnything(currPath) && currentDepth !== maxDepth) {
        console.log(indent + '├──' + items[i]);
        printDirContent(currPath, currentDepth + 1, maxDepth)
    } else {
        console.log(indent + '└──' + items[i]);
    }
}

const isDir = (path) => {
    const stats = fs.statSync(path);
    if (stats === undefined) {
        throw new Error('No stats available for path ' + path);
    }
    return stats.isDirectory();
}

const isDirContainsAnything = (pathToDir) => {
    return fs.readdirSync(pathToDir).length !== 0;
}

const main = () => {
    const args = yargs(hideBin(process.argv)).argv;
    const depth = args.D;
    const basePath = args._[0];

    console.log(basePath);
    if (isDir(basePath)) {
        printDirContent(basePath, 0, depth);
    }
}

main();