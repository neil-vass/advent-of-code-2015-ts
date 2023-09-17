import * as utils from "../src/aoc-utils";


export async function* fetchData(path: string) {
    const lines = utils.linesFromFile(path);
    for await (const line of lines) {
        yield line.split('x').map(n => Number(n));
    }
}



export function requiredWrapping(length: number, width: number, height: number) {
    const sides = [length*width, width*height, height*length];
    const smallestSide = Math.min(...sides);
    return sides.reduce((acc, val) => acc + 2*val, smallestSide);
}

async function main() {
    const data = fetchData("src/data/day02.txt");
    // TODO: is there a nice .reduce() syntax I can use?
    // TODO: Python accepts generators easily, to pipeline things like that.
    // TODO: Don't know if this being an async generator complicates things...
    let total = 0;
    for await (const dimensions of data) {
        // TODO: How can I ...spread the array in here as arguments?
        total += requiredWrapping(dimensions[0], dimensions[1], dimensions[2]);
    }
    console.log(total);
}

if (require.main === module) {
    void main();
}
