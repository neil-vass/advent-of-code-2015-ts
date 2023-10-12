import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";
import * as math from "mathjs";


type LightAction = "turn on" | "turn off" | "toggle";

export class GridOfLights {
    private lights = math.matrix(math.zeros(1000, 1000));

    lit() {
        return math.sum(this.lights) as number;
    }

    run(action: LightAction, fromX: number, fromY: number, toX: number, toY: number) {
        const areaToUpdate = math.index(math.range(fromX, toX+1), math.range(fromY, toY+1));
        if (action === "turn on") {
            this.lights.subset(areaToUpdate, 1);
        } else if (action === "turn off") {
            this.lights.subset(areaToUpdate, 0);
        } else if (action === "toggle") {
            const replacement = this.lights.subset(areaToUpdate).map((value) => value ? 0 : 1);
            this.lights.subset(areaToUpdate, replacement);
        }
    }
}

export class GridOfLightsV2 {
    private lights = math.matrix(math.zeros(1000, 1000));

    brightness() {
        return math.sum(this.lights) as number;
    }

    run(action: LightAction, fromX: number, fromY: number, toX: number, toY: number) {
        const areaToUpdate = math.index(math.range(fromX, toX+1), math.range(fromY, toY+1));
        const update = {
            "turn on": (value: number) => value+1,
            "turn off": (value:number) => (value === 0) ? 0 : value-1,
            "toggle": (value: number) => value+2
        }

        const replacement = this.lights.subset(areaToUpdate).map(update[action]);
        this.lights.subset(areaToUpdate, replacement);
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

// There's things I could change to make the matrix parts of this script
// more readable, but I don't think any of them would change the overall performance.
//
// This script (using mathjs) runs in about 15 seconds (that's the 'real' time
// given by `command time node src/day06.js`).
//
// Equivalent script in Python (using numpy) runs in about 0.15 seconds timed
// by the same method.
//
// I know numpy matrices do a lot to optimise things, but... wow, 100x faster?
// I'll try a few other Node libraries and/or using built-in arrays instead.
//
//
// A quick check: instead of running through the whole file of instructions, reading
// with my line-by-line async generators, let's run just hardcoded lines.
//   1 instruction: ~0.4 seconds (much longer than the 0.15s for Python to do full script)
//   3 instructions: ~0.48 seconds
//   All 300 instructions: ~15 seconds.
// Looks like File I/O and using async isn't contributing much at all to the time.
//
//
// Another check: is Node really slow at regex? Unlikely, but that's the only other
// work this script's doing. Let's hardcode the instruction arrays instead of just lines.
//   1 instruction: ~0.4 seconds
//   3 instructions: ~0.48 seconds
//   All 300 instructions: ~15 seconds.
// Regex and making the instruction arrays isn't contributing much at all to the time.
//
//
// Update: the standard JS array approach runs in 0.13 seconds ... faster than the Python version.
// That's definitely fast enough, there's a lesson here!
// For this puzzle: arrays version is readable and easy to work with. Let's see if there's examples
// where numpy-style features would make a real difference.