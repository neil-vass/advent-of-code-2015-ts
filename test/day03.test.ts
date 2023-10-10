import {expect, describe, it} from "vitest";
import * as day03 from "../src/day03";

describe("#housesDeliveredTo (single Santa)", () => {
    it("Delivers to 2 houses from a single instruction", () => {
        expect(day03.housesDeliveredTo(">")).toBe(2);
    });

    it("Delivers to 4 houses in a square, including twice to first house", () => {
        expect(day03.housesDeliveredTo("^>v<")).toBe(4);
    });

    it("Delivers lots of presents to 2 lucky houses", () => {
        expect(day03.housesDeliveredTo("^v^v^v^v^v")).toBe(2);
    });
});

describe("#housesDeliveredTo (2 Santas)", () => {
    it("Delivers to 3 houses with an up-down instruction", () => {
        expect(day03.housesDeliveredTo("^v", 2)).toBe(3);
    });

    it("Delivers to 4 houses in a square, including twice to first house", () => {
        expect(day03.housesDeliveredTo("^>v<", 2)).toBe(3);
    });

    it("Delivers lots of presents to 2 lucky houses", () => {
        expect(day03.housesDeliveredTo("^v^v^v^v^v", 2)).toBe(11);
    });
});