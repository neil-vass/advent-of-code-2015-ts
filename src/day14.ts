import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export class Reindeer {
    constructor(
        private readonly speed: number,
        private readonly moveDuration: number,
        private readonly restDuration: number) {}

    distanceAfter(duration: number) {
        if (duration < 0) throw new Error("Positive numbers only");

        const wholeCycle = this.moveDuration + this.restDuration;
        const numWholeCycles = Math.floor(duration / wholeCycle);
        const remainderDuration = duration % wholeCycle;

        const wholeCycleDist = numWholeCycles * this.moveDuration * this.speed;
        const remainderDist = Math.min(remainderDuration, this.moveDuration) * this.speed;
        return wholeCycleDist + remainderDist;
    }
}

export function reindeerFromDescription(line: string) : Reindeer {
    const m = line.match(/^\w+ can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds.$/);
    if (!m) throw new Error(`Unexpected line format: "${line}"`);
    const [, speed, moveDuration, restDuration] = m;
    return new Reindeer(+speed, +moveDuration, +restDuration);
}

export async function findWinningDistance(raceDuration: number, reindeerDescriptions: Sequence<string>) {
    const distances = reindeerDescriptions.map(rd => reindeerFromDescription(rd)).map(r => r.distanceAfter(raceDuration));
    return Sequence.max(distances);
}

export function fn(filepath: string) {
    return "Hello, World!";
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const raceDuration = 2503;
    const reindeerDescriptions = linesFromFile("./src/data/day14.txt");
    console.log(await findWinningDistance(raceDuration, reindeerDescriptions));
}

