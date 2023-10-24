import {expect, describe, it} from "vitest";
import * as day14 from "../src/day14";
import {findWinningDistance} from "../src/day14";
import {Sequence} from "../src/sequence";

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

describe("#reindeerFromDescription", () => {
    it("Creates a reindeer with values from a description", () => {
        const line = "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds."
        const dancer = day14.reindeerFromDescription(line);
        expect(dancer.distanceAfter(1)).toBe(16);
        expect(dancer.distanceAfter(1000)).toBe(1056);
    });
});

describe("#findWinningDistance", () => {
    it("Answers 'what distance has the winning reindeer traveled?' for the given race duration.", async () => {
        const reindeerDescriptions = new Sequence([
            "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.",
            "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds."
        ]);
        expect(await day14.findWinningDistance(1000, reindeerDescriptions)).toBe(1120);
    });
});
