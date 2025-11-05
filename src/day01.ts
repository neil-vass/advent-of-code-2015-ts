import { pathToFileURL } from 'url'
import {singleLineFromFile} from "./helpers.js";

export function findFloor(instructions: string) {
    let floor = 0;
    for (const c of instructions) {
        floor += (c === '('? 1 : -1);
    }
    return floor;
}

export function firstEntryToBasement(instructions: string) {
    let floor = 0;
    let pos = 0;
    for(const c of instructions) {
        pos++;
        floor += (c === '('? 1 : -1);

        if(floor === -1) {
            return pos;
        }
    }
}


// If this script was invoked directly on the command line:
if(pathToFileURL(process.argv[1]).href === import.meta.url) {
    const instructions = singleLineFromFile("src/data/day01.txt");
    console.log(findFloor(instructions));
    console.log(firstEntryToBasement(instructions));
}

