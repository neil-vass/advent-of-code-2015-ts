import {expect, describe, it} from "vitest";
import * as day14 from "../src/day14.js";
import {findWinningDistance, Reindeer} from "../src/day14.js";
import {Sequence} from "../src/sequence.js";

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

describe("#ReindeerRacer", () => {
    it("Reindeer rack up point throughout the race duration, depending on who's in the lead.", async () => {
        const competitors = [
            new Reindeer(14, 10, 127), // Comet
            new Reindeer(16, 11, 162)  // Dancer
        ];

        const racer = new day14.ReindeerRacer(competitors);
        expect(racer.scoresAfter(1)).toStrictEqual([0, 1]);
        expect(racer.scoresAfter(140)).toStrictEqual([1, 139]);
        expect(racer.scoresAfter(1000)).toStrictEqual([312, 689]);

    });
});

describe("#raceReindeerPart2", () => {
    it("Gives the same result as puzzle example.", async () => {
        const reindeerDescriptions = new Sequence([
            "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.",
            "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds."
        ]);
        expect(await day14.raceReindeerPart2(1000, reindeerDescriptions)).toBe(689);
    });
});
