import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";


type LightAction = "turn on" | "turn off" | "toggle";

export class GridOfLights {
    private lights: number[][] = Array.from(Array(1000), () => Array(1000).fill(0));

    lit() {
        let total = 0;
        for (const row of this.lights) {
            for (const val of row) {
                if (val > 0) total += 1;
            }
        }
        return total;
    }

    run(action: LightAction, fromX: number, fromY: number, toX: number, toY: number) {
        for (let x = fromX; x <= toX; x++) {
            for (let y = fromY; y <= toY; y++) {
                if (action === "turn on")
                    this.lights[x][y] = 1
                else if (action === "turn off")
                    this.lights[x][y] = 0
                else
                    this.lights[x][y] = this.lights[x][y] ? 0 : 1
            }
        }
    }
}

export class GridOfLightsV2 {
    private lights: number[][] = Array.from(Array(1000), () => Array(1000).fill(0));

    brightness() {
        let total = 0;
        for (const row of this.lights) {
            for (const val of row) {
                total += val;
            }
        }
        return total;
    }

    run(action: LightAction, fromX: number, fromY: number, toX: number, toY: number) {
        for (let x = fromX; x <= toX; x++) {
            for (let y = fromY; y <= toY; y++) {
                if (action === "turn on") {
                    this.lights[x][y] += 1
                } else if (action === "turn off") {
                    if (this.lights[x][y] > 0) this.lights[x][y] -= 1;
                } else {
                    this.lights[x][y] += 2
                }
            }
        }
    }
}

export function parseInstruction(instruction: string) : [LightAction, number, number, number, number] {
    const m = instruction.match(/^(turn on|toggle|turn off) (\d{1,3}),(\d{1,3}) through (\d{1,3}),(\d{1,3})$/);
    if(!m) throw new Error(`Unexpected instruction: "${instruction}"`);

    return [m[1] as LightAction, +m[2], +m[3], +m[4], +m[5]];
}

export async function litAfterInstructions(lines: Sequence<string>) {
    const lights = new GridOfLights();
    const instructions = lines.map(line => parseInstruction(line));

    for await (const instruction of instructions) {
        lights.run(...instruction);
    }
    return lights.lit();
}

export async function brightnessAfterInstructions(lines: Sequence<string>) {
    const lights = new GridOfLightsV2();
    const instructions = lines.map(line => parseInstruction(line));

    for await (const instruction of instructions) {
        lights.run(...instruction);
    }
    return lights.brightness();
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const lines = linesFromFile("./src/data/day06.txt");
    console.log(await brightnessAfterInstructions(lines));
}

// This was my second attempt. day06-mathjs was me looking for a library
// with matrices like Python's numpy - didn't really work! I'll keep looking.


