/// <reference lib="webworker" />
import * as CryptoJS from 'crypto-js';
import {BlockInterface} from "./types/block.interface";

addEventListener('message', ({ data }) => {
  let start = new Date().getTime();

  const block: BlockInterface = JSON.parse(data);
  let difficulty = 4, nonce = 0, hash, date;
  do {
    nonce++;
    date = Date.now();
    hash = CryptoJS.SHA256(`${block.data}${block.nonce}${block.prevHash}${date}${nonce}`).toString();
  } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

  let end = new Date().getTime();

  let response = {
    date: date,
    nonce: nonce,
    hash: hash,
    performance: end - start
  };

  postMessage(response);
});
