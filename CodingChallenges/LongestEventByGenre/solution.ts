'use strict';

import { createWriteStream, WriteStream } from 'fs';
import * as https from 'https';

process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputString = '';
let inputLines: string[] = [];
let currentLine = 0;

process.stdin.on('data', (inputStdin: string): void => {
    inputString += inputStdin;
});

process.stdin.on('end', (): void => {
    inputLines = inputString.split('\n');
    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

interface HackerRankEvent {
    id: string;
    name: string;
    genres: string[];
    organized_by: string;
    duration: number;
    [key: string]: unknown;
}

interface EventsResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: HackerRankEvent[];
}

// HackerRank's Node runtime has no global `fetch`, so use the built-in
// `https` module wrapped in a promise instead of an external HTTP library.
function httpGetJson(url: string): Promise<EventsResponse> {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data) as EventsResponse);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on('error', reject);
    });
}

/*
 * Complete the 'longestDuration' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 * 1. STRING organizer
 * 2. STRING genre
 * API URL: https://jsonmock.hackerrank.com/api/events?organized_by=<organizer>
 */

async function longestDuration(organizer: string, genre: string): Promise<string> {
    const baseUrl = `https://jsonmock.hackerrank.com/api/events?organized_by=${encodeURIComponent(organizer)}`;

    let page = 1;
    let totalPages = 1;
    let bestId: string | null = null;
    let bestDuration = -Infinity;

    do {
        const body = await httpGetJson(`${baseUrl}&page=${page}`);
        totalPages = body.total_pages;

        for (const event of body.data) {
            if (event.organized_by !== organizer) continue;
            if (!event.genres.includes(genre)) continue;

            const isLonger = event.duration > bestDuration;
            const isTieAndSmallerId =
                event.duration === bestDuration && (bestId === null || event.id < bestId);

            if (isLonger || isTieAndSmallerId) {
                bestDuration = event.duration;
                bestId = event.id;
            }
        }

        page++;
    } while (page <= totalPages);

    return bestId ?? '-1';
}

async function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const organizer: string = readLine();
    const genre: string = readLine();

    const result: string = await longestDuration(organizer, genre);

    ws.write(result + '\n');

    ws.end();
}
