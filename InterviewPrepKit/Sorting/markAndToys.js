'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the maximumToys function below.
function maximumToys(prices, k) {
  let sortedPrices = prices.sort(function(a,b){return a - b});
  
  let countOfToys = 1;

  const reducer = (accumulator, currentValue) => {
    if (accumulator + currentValue <= k) {
      countOfToys++;
      return accumulator + currentValue;
    }
    return accumulator;
  }
  
  sortedPrices.reduce(reducer);

  return countOfToys;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const prices = readLine().split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    let result = maximumToys(prices, k);

    ws.write(result + "\n");

    ws.end();
}
