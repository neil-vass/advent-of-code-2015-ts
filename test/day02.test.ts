import {expect, describe, it} from "vitest";
import * as day02 from "../src/day02"


describe("#parsePresent", () => {
    it("Splits a string into a present", async () => {
        const line = "2x3x4";
        expect(day02.parsePresent(line)).toStrictEqual([2, 3, 4]);
    });
});

describe("#requiredWrapping", () => {
    it("Needs double area of the side, plus area of smallest side", async () => {
        expect(day02.requiredWrapping(2, 3, 4)).toBe(58);
    });

    it("Takes output of parsePresent", async () => {
        const line = "1x1x10";
        const dimensions = day02.parsePresent(line);
        expect(day02.requiredWrapping(...dimensions)).toBe(43);
    });
});

describe("#totalWrappingForPresents", () => {
    it("Reads a file of presents and finds total area needed", async () => {
        const total = await day02.totalWrappingForPresents("./test/data/day02.txt");
        expect(total).toBe(101);
    });
});



