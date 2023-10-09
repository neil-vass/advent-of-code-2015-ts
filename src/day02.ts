import {linesFromFile} from "./file_helpers.js";
import {Sequence} from "./sequence.js";

export function parsePresent(line: string): [number, number, number] {
    const dimensions = line.split("x").map(s => +s);
    if (dimensions.length !== 3) throw new Error(`Can't parse line: "${line}"`);

    // @ts-ignore - compiler's not confident this is 3 numbers.
    return dimensions;
}

function sum(nums: number[]) {
    return nums.reduce((acc, val) => acc + val);
}

export function requiredWrapping(length: number, width: number, height: number) {
    const sides = [length*width, width*height, height*length];
    return sum([...sides, ...sides, Math.min(...sides)]);
}

export async function totalWrappingForPresents(path: string) {
    const lines = linesFromFile(path);
    const presentDimensions = lines.map(line => parsePresent(line));
    const wrapping = presentDimensions.map(p => requiredWrapping(...p));
    return Sequence.sum(wrapping);
}


// If this script was invoked directly on the command line:
if(`file://${process.argv[1]}` === import.meta.url) {
    const data = "./src/data/day02.txt";
    console.log(await totalWrappingForPresents(data));
}

