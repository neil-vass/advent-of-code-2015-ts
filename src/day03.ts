import fs from "fs";
import {singleLineFromFile} from "./helpers.js";


export function housesDeliveredTo(instructions: string) {
    let x = 0, y = 0;
    const visited = new Set();
    visited.add([x,y].toString());

    for (const move of instructions) {
        if (move === ">") {
            x += 1;
        } else if (move === "<") {
            x -= 1;
        } else if (move === "^") {
            y += 1;
        } else if (move === "v") {
            y -= 1;
        } else {
            throw new Error(`Unexpected instruction: ${move}`);
        }

        visited.add([x,y].toString());
    }
    return visited.size;
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const instructions = singleLineFromFile("./src/data/day03.txt");
    console.log(housesDeliveredTo(instructions));
}
