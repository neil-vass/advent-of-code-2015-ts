import {expect, describe, it, beforeEach} from "vitest";
import * as day18 from "../src/day18.js";


describe("Basic operations", () => {

    it("Neighbour checks", async () => {
        const grid = await day18.Grid.create(2, 2, [
            "..",
            ".."
        ]);

        // @ts-ignore strange...
        const neighbours = [...grid.neighboursOf([0,0])];
        expect(neighbours.length).toBe(3);
        expect(neighbours).toContainEqual([0,1]);
        expect(neighbours).toContainEqual([1,0]);
        expect(neighbours).toContainEqual([1,1]);
    });

    it("Empty grid stays dark", async () => {
        const grid = await day18.Grid.create(2, 2, [
            "..",
            ".."
        ]);

        grid.step();
        expect(grid.countLitLights()).toBe(0);
    });

    it("Light with 1 neighbour goes dark", async () => {
        const grid = await day18.Grid.create(2, 2, [
            "##",
            ".."
        ]);

        grid.step();
        expect(grid.countLitLights()).toBe(0);
    });
});

describe("Tests with puzzle's example 6x6 grid", () => {

    let grid: day18.Grid;

    beforeEach(async () => {
        grid = await day18.Grid.create(6, 6, [
            ".#.#.#",
            "...##.",
            "#....#",
            "..#...",
            "#.#..#",
            "####.."
        ]);
    });

    it("Counts lights", () => {
        expect(grid.countLitLights()).toBe(15);
    });


    it("Steps through one generation", () => {
        grid.step();
        expect(grid.countLitLights()).toBe(11);
    });

    it("Steps through multiple generations", () => {
        grid.step();
        grid.step();
        grid.step();
        grid.step();
        expect(grid.countLitLights()).toBe(4);
    });

    it("Matches example for part 2's sticky corners", () => {
        grid.setStickyCorners();
        for (let i=0; i<5; i++) {
            grid.step();
        }
        expect(grid.countLitLights()).toBe(17);
    });
});

