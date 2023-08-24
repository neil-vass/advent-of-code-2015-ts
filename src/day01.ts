import fs from "fs";

function fetchData(path: string) {
    return fs.readFileSync(path, "utf8");
}

export function findFloor(instructions: string) {
    const up = (instructions.match(/\(/g) || []).length;
    const down = (instructions.match(/\)/g) || []).length;
    return up - down;
}

if (require.main === module) {
    const data: string = fetchData("data/day01.txt");
    console.log(findFloor(data));
}
