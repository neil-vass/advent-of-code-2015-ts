import {expect, describe, it} from "vitest";
import * as day14 from "../src/day14";

const testFilename = "./test/data/day14.txt"

describe("Reindeer class", () => {
    it("Tells you how far it got", () => {
        const comet = new day14.Reindeer(14, 10, 127);
        expect(comet.distanceAfter(1)).toBe(14);
        expect(comet.distanceAfter(10)).toBe(140);
        expect(comet.distanceAfter(12)).toBe(140);
        expect(comet.distanceAfter(1000)).toBe(1120);
    });
});

