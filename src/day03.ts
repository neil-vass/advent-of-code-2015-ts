import {singleLineFromFile} from "./helpers.js";

function move(dir: string, pos: [number, number]): [number, number] {
    const [x,y] = pos;
    switch(dir) {
        case ">": return [x+1, y];
        case "<": return [x-1, y];
        case "^": return [x, y+1];
        case "v": return [x, y-1];
        default: throw new Error(`Unexpected instruction: ${dir}`);
    }
}

export function housesDeliveredTo(instructions: string, numSantas: number = 1) {

    const santaPositions: [number, number][] = [];
    while (santaPositions.length < numSantas) {
        santaPositions.push([0,0]);
    }

    let currentSanta = 0;
    const visited = new Set();
    visited.add(santaPositions[currentSanta].toString());

    for (const dir of instructions) {
        santaPositions[currentSanta] = move(dir, santaPositions[currentSanta]);
        visited.add(santaPositions[currentSanta].toString());
        currentSanta = (currentSanta+1) % numSantas;
    }
    return visited.size;
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const instructions = singleLineFromFile("./src/data/day03.txt");
    console.log(housesDeliveredTo(instructions));
    console.log(housesDeliveredTo(instructions, 2));
}
