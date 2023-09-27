import * as utils from "../src/aoc-utils";

export class Present {
    constructor(readonly length: number,
                readonly width: number,
                readonly height: number) {}

    // Find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l.
    // The elves also need a little extra paper for each present:
    // the area of the smallest side.
    requiredWrapping() {
        const sides =[this.length * this.width,
                                this.width * this.height,
                                this.height * this.length];

        return sides.reduce((acc, side) => acc + 2*side, Math.min(...sides))
    }
}

export function fetchData(path: string)  {
    const lines = utils.linesFromFile(path);
    return utils.map(lines, (ln) => {
        const m = ln.match(/^(\d+)x(\d+)x(\d+)$/);
        if(!m) {
            throw Error(`File's not formatted correctly, one line is "${ln}"`);
        }
        return new Present(Number(m[1]), Number(m[2]), Number(m[3]));
    });
}

export async function totalWrappingForPresents(presents: utils.Sequence<Present>) {
    return await utils.sum(utils.map(presents, p => p.requiredWrapping()));
}

if (require.main === module) {
    (async () => {
        const data = fetchData("src/data/day02.txt")
        console.log(await totalWrappingForPresents(data));
    })();
}
