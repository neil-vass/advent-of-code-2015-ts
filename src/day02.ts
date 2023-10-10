import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export function parsePresent(line: string): [number, number, number] {
    const dimensions = line.split("x").map(s => +s);
    if (dimensions.length !== 3) throw new Error(`Can't parse line: "${line}"`);

    // @ts-ignore - compiler's not confident this is 3 numbers.
    return dimensions;
}

// Reuse: if more files need this, move to helpers.ts
function sum(nums: number[]) {
    return nums.reduce((acc, val) => acc + val);
}

export function requiredWrapping(length: number, width: number, height: number) {
    const sideAreas = [length*width, width*height, height*length];
    return sum([...sideAreas, ...sideAreas, Math.min(...sideAreas)]);
}

// Reuse: if more files need this, move to helpers.ts
function sortAscending(...nums: number[]) {
    return nums.sort((a,b) => a - b);
}

export function requiredRibbon(length: number, width: number, height: number) {
    const dimensions = sortAscending(length, width, height);
    return 2*dimensions[0] + 2*dimensions[1] + (length * width * height);
}

export async function totalForPresents(calculator: (length: number, width: number, height: number) => number, path: string) {
    const lines = linesFromFile(path);
    const presentDimensions = lines.map(line => parsePresent(line));
    const required = presentDimensions.map(p => calculator(...p));
    return Sequence.sum(required);
}

// If this script was invoked directly on the command line:
if(`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day02.txt";
    console.log(await totalForPresents(requiredWrapping, filepath));
    console.log(await totalForPresents(requiredRibbon, filepath));
}

