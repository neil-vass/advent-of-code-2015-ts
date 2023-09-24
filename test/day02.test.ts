import {expect, describe, it} from "vitest";
import * as utils from "../src/aoc-utils";
import * as day02 from "../src/day02"

describe("#fetchData", () => {
    it("Splits each row into 3 numbers", async () => {
        const data = day02.fetchData("test/data/day02.txt");
        const expected = [
            [2, 3, 4],
            [1, 1, 10]
        ];

        expect(await utils.toArray(data)).toStrictEqual(expected);
    });
});

describe("#requiredWrapping", () => {
    it("Returns surface area plus smallest side for 2x3x4", () => {
        expect(day02.requiredWrapping(2, 3, 4)).toBe(58);
    });

    it("Returns surface area plus smallest side for 1x1x10", () => {
        expect(day02.requiredWrapping(1, 1, 10)).toBe(43);
    });
});

describe("#totalWrappingForPresents", () => {
    it("Returns total for whole collection", async () => {
        const data = day02.fetchData("test/data/day02.txt");
        expect(await day02.totalWrappingForPresents(data)).toBe(101);
    })
})






