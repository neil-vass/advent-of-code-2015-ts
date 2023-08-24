import fs from "fs";

export function fetchData(path: string) {
    return fs.readFileSync(path, "utf8");
}


if (require.main === module) {
    const data: string = fetchData("data/day.txt");
    console.log();
}
