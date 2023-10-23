import {expect, describe, it, vi} from "vitest";
import * as day13 from "../src/day13";

const testFilename = "./test/data/day13.txt"

// Rather than "is this the best design and set of tests", I'm working on:
// "how do test doubles work in vitest?"
describe("#loadRulesFromFile", () => {
    it("Stores given lines", async () => {
        const arranger = new day13.SeatingArranger()
        const spy = vi.spyOn(arranger, "store");

        await day13.loadRulesFromFile(testFilename, arranger);
        expect(spy).toHaveBeenCalledTimes(12);
        expect(spy).toHaveBeenNthCalledWith(1, "Alice", 54, "Bob");
        expect(spy).toHaveBeenNthCalledWith(11, "David", -7, "Bob");
    });
});

describe("#SeatingArranger", () => {
    it("Stores rules and gives correct optimal happiness when only one choice", async () => {
        const arranger = new day13.SeatingArranger();
        arranger.store("Alice", 54, "Bob");
        arranger.store("Bob", 83, "Alice");
        expect(await arranger.optimalHappiness()).toBe(54+83);
    });

    it("Picks optimal arrangement from multiple possibilities (example from part 1)", async () => {
        const arranger = new day13.SeatingArranger();
        await day13.loadRulesFromFile(testFilename, arranger);
        expect(await arranger.optimalHappiness()).toBe(330);
    });
});