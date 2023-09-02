import {expect, describe, it} from "vitest";
const day02 = require("../src/day02")

describe("#fetchData", () => {
    it("Splits each row into 3 numbers", () => {
        const data = day02.fetchData("test/data/day02.txt");
        expect(data.next().value).toStrictEqual([2, 3, 4]);
        expect(data.next().value).toStrictEqual([1, 1, 10]);
        expect(data.next().value).toBeUndefined();
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






