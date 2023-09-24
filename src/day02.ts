import * as utils from "../src/aoc-utils";

export type PresentDimensions = [length: number, width: number, height: number]
export function fetchData(path: string)  {
    const lines = utils.linesFromFile(path);
    return utils.map(lines, (ln) => {
        const m = ln.match(/^(\d+)x(\d+)x(\d+)$/);
        if(!m) {
            throw Error(`File's not formatted correctly, one line is "${ln}"`);
        }
        const dimensions: PresentDimensions = [Number(m[1]), Number(m[2]), Number(m[3])];
        return dimensions;
    });
}

export function requiredWrapping(length: number, width: number, height: number) {
    const sides = [length*width, width*height, height*length];
    const smallestSide = Math.min(...sides);
    return sides.reduce((acc, val) => acc + 2*val, smallestSide);
}

export async function totalWrappingForPresents(presentDimensions: utils.Sequence<[number, number, number]>) {
    // TODO: is there a nice .reduce() syntax I can use?
    // TODO: Python accepts generators easily, to pipeline things like that.
    // TODO: Don't know if this being an async generator complicates things...
    let total = 0;
    for await (const dimensions of presentDimensions) {
        // TODO: How can I ...spread the array in here as arguments?
        const [length, width, height] = dimensions;
        total += requiredWrapping(length, width, height);
    }
    return total;
}

if (require.main === module) {
    (async () => {
        const data = fetchData("src/data/day02.txt")
        console.log(await totalWrappingForPresents(data));
    })();
}
