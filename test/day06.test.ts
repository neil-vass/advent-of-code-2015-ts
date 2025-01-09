import {expect, describe, it} from "vitest";
import * as day06 from "../src/day06.js";
import {Sequence} from "../src/sequence.js";

describe("GridOfLights class", () => {
    it("Starts off all dark", () => {
        const lights = new day06.GridOfLights();
        expect(lights.lit()).toBe(0);
    });

    it("'turn on' lights 'off' lights, leaves 'on' ones alone", () => {
        const lights = new day06.GridOfLights();
        lights.run("turn on", 0,0, 999,999);
        expect(lights.lit()).toBe(1_000_000);
        lights.run("turn on", 0,0, 999,999);
        expect(lights.lit()).toBe(1_000_000);
    });

    it("'toggle' flips between on and off", () => {
        const lights = new day06.GridOfLights();
        lights.run("toggle", 0,0, 999,0);
        expect(lights.lit()).toBe(1_000);
        lights.run("toggle", 0,0, 999,0);
        expect(lights.lit()).toBe(0);
    });

    it("'turn off' dims 'on' lights, leaves 'off' ones alone", () => {
        const lights = new day06.GridOfLights();
        lights.run("turn on", 0,0, 999,999);
        expect(lights.lit()).toBe(1_000_000);

        lights.run("turn off", 499,499, 500,500);
        expect(lights.lit()).toBe(999_996);
        lights.run("turn off", 499,499, 500,500);
        expect(lights.lit()).toBe(999_996);
    });
});

describe("#parseInstruction", () => {
    it("Splits instruction string into values", () => {
        expect(day06.parseInstruction("turn on 0,0 through 999,999")).toStrictEqual(["turn on", 0,0, 999,999]);
        expect(day06.parseInstruction("toggle 0,0 through 999,0")).toStrictEqual(["toggle", 0,0, 999,0]);
        expect(day06.parseInstruction("turn off 499,499 through 500,500")).toStrictEqual(["turn off", 499,499, 500,500]);
    });

    it("Rejects unexpected strings", () => {
        expect(() => day06.parseInstruction("")).toThrow();
        expect(() => day06.parseInstruction("toggle a,b through 999,0")).toThrow();
        expect(() => day06.parseInstruction("trouble 499,499 through 500,500")).toThrow();
        expect(() => day06.parseInstruction("turn on 9999,499 through 500,500")).toThrow();
    });
});

describe("#litAfterInstructions", () => {
    it("Runs a sequence of instruction strings", async () => {
        const lines = new Sequence([
            "turn on 0,0 through 999,999",
            "toggle 0,0 through 999,0",
            "turn off 499,499 through 500,500"]);

        expect(await day06.litAfterInstructions(lines)).toBe(1_000_000 - 1_000 - 4);
    });
});


describe("GridOfLightsV2 class", () => {
    it("Starts off all dark", () => {
        const lights = new day06.GridOfLightsV2();
        expect(lights.brightness()).toBe(0);
    });

    it("'turn on' increases each light's brightness by 1", () => {
        const lights = new day06.GridOfLightsV2();
        lights.run("turn on", 0,0, 999,999);
        expect(lights.brightness()).toBe(1_000_000);
        lights.run("turn on", 0,0, 999,999);
        expect(lights.brightness()).toBe(2_000_000);
    });

    it("'toggle' increases each light's brightness by 2", () => {
        const lights = new day06.GridOfLightsV2();
        lights.run("toggle", 0,0, 999,0);
        expect(lights.brightness()).toBe(2_000);
        lights.run("toggle", 0,0, 999,0);
        expect(lights.brightness()).toBe(4_000);
    });

    it("'turn off' reduces each light's brightness by 1, to a minimum of zero", () => {
        const lights = new day06.GridOfLightsV2();
        lights.run("turn on", 0,0, 999,999);
        expect(lights.brightness()).toBe(1_000_000);
        lights.run("turn on", 0,0, 999,999);
        expect(lights.brightness()).toBe(2_000_000);

        lights.run("turn off", 499,499, 500,500);
        expect(lights.brightness()).toBe(1_999_996);
        lights.run("turn off", 499,499, 500,500);
        expect(lights.brightness()).toBe(1_999_992);
        lights.run("turn off", 499,499, 500,500);
        expect(lights.brightness()).toBe(1_999_992);
    });
});

describe("#brightnessAfterInstructions", () => {
    it("Runs a sequence of instruction strings", async () => {
        const lines = new Sequence([
            "turn on 0,0 through 999,999",
            "toggle 0,0 through 999,0",
            "turn off 499,499 through 500,500"]);

        expect(await day06.brightnessAfterInstructions(lines)).toBe(1_000_000 + 2_000 - 4);
    });
});