import fs from "fs";

function fetchData(path: string) {
    return fs.readFileSync(path, "utf8");
}

export function findFloor(instructions: string) {
    const up = (instructions.match(/\(/g) || []).length;
    const down = (instructions.match(/\)/g) || []).length;
    return up - down;
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


if (require.main === module) {
    const data: string = fetchData("data/day01.txt");
    console.log(findFloor(data));
    console.log(firstEntryToBasement(data));
}
