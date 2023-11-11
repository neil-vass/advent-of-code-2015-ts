import {expect, describe, it} from "vitest";
import {waysToStore, numWaysToStore, numWaysToStoreInMinimumContainers} from "../src/day17";


describe("#numWaysToStore", () => {
    it("No containers means no way to store", () => {
        expect(numWaysToStore(10, [])).toBe(0);
    });

    it("Single container of correct size gets filled", () => {
        expect(numWaysToStore(10, [10])).toBe(1);
    });

    it("Can't use a too-small container", () => {
        expect(numWaysToStore(10, [5])).toBe(0);
    });

    it("Can't part-fill container", () => {
        expect(numWaysToStore(10, [20])).toBe(0);
    });

    it("Can use multiple containers", () => {
        expect(numWaysToStore(25, [15, 10])).toBe(1);
    });

    it("Finds multiple options", () => {
        // Use the 20 container, plus either the first 5 or the second 5
        expect(numWaysToStore(25, [20, 5, 5])).toBe(2);
    });

    it("Matches puzzle example", () => {
        expect(numWaysToStore(25, [20, 15, 10, 5, 5])).toBe(4);
    });
});

describe("Part 2's plot twist", () => {
    it("waysToStore matches puzzle example", () => {
        const combos = waysToStore(25, [20, 15, 10, 5, 5])
        expect(combos.length).toBe(4);
        expect(combos).toContainEqual([15, 10]);
        expect(combos).toContainEqual([20, 5]);
        expect(combos).toContainEqual([15, 5, 5]);
    });

    it("numWaysToStoreInMinimumContainers matches puzzle example", () => {
        const count = numWaysToStoreInMinimumContainers(25, [20, 15, 10, 5, 5])
        expect(count).toBe(3);
    });

});