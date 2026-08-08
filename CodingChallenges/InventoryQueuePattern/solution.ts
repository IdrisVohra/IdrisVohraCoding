'use strict';

import { createWriteStream, WriteStream } from 'fs';

process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin: string): void => {
    inputString += inputStdin;
});

process.stdin.on('end', (): void => {
    inputString = inputString.split('\n');
    main();
});

function readLine(): string {
    return inputString[currentLine++];
}

/*
 * Complete the 'findMinOperations' function below.
 * The function is expected to return an INTEGER.
 * The function accepts STRING processingQueue as parameter.
 */

function findMinOperations(processingQueue: string): number {
    const pattern = 'abc';
    let pointer = 0;
    let insertions = 0;

    for (const ch of processingQueue) {
        while (ch !== pattern[pointer]) {
            insertions++;
            pointer = (pointer + 1) % 3;
        }
        pointer = (pointer + 1) % 3;
    }

    if (pointer !== 0) {
        insertions += 3 - pointer;
    }

    return insertions;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const processingQueue: string = readLine();

    const result: number = findMinOperations(processingQueue);

    ws.write(result + '\n');

    ws.end();
}
