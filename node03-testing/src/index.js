#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from "yargs/helpers"
import { printFilesTree } from './tree.js'

const main = () => {
  const args = yargs(hideBin(process.argv)).argv;
  const basePath = args._[0];
  const depth = args.D;

  printFilesTree(basePath, depth);
}

main();

// npm start -- -D 3 "C:\Program Files\nodejs"

