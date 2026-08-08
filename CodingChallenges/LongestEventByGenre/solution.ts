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
        const response = await fetch(`${baseUrl}&page=${page}`);
        const body = (await response.json()) as EventsResponse;
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
