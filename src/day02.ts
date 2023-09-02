import fs from "fs";
import readline from "node:readline/promises";

export async function* fetchData(path: string) {
    const lineReader = readline.createInterface(
        {input: fs.createReadStream(path)});

    for await (const line of lineReader) {
        yield line.split('x').map(n => Number(n));
    }
}

export function requiredWrapping(length: number, width: number, height: number) {
    const sides = [length*width, width*height, height*length];
    const smallestSide = Math.min(...sides);
    return sides.reduce((acc, val) => acc + 2*val, smallestSide);
}

if (require.main === module) {
    // TODO: Can't have a top-level await without changing some settings -
    // TODO: here's a hacky "pretend it's async" thing until I change those.
    (async () => {
        const data = fetchData("src/data/day02.txt");
        // TODO: is there a nice .reduce() syntax I can use?
        // TODO: Python accepts generators easily, to pipeline things like that.
        // TODO: Don't know if this being an async generator complicates things...
        let total = 0;
        for await (const dimensions of data) {
            // TODO: How can I ...spread the array in here as arguments?
            total += requiredWrapping(dimensions[0],dimensions[1],dimensions[2]);
        }
        console.log(total);
    })();
    console.log();
}
