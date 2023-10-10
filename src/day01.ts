import fs from "fs";

function fetchData(path: string) {
    return fs.readFileSync(path, "utf8");
}

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
if(`file://${process.argv[1]}` === import.meta.url) {
    const data: string = fetchData("src/data/day01.txt");
    console.log(findFloor(data));
    console.log(firstEntryToBasement(data));
}

