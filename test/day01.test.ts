import {expect, describe, it} from "vitest";
const day01 = require("../src/day01")

describe("#findFloor", () => {
    it("Gets back to 0 with even matches", () => {
        expect(day01.findFloor("(())")).toBe(0);
    });

    it("Gets floor 3 when there are 3 more (", () => {
        expect(day01.findFloor("(()(()(")).toBe(3);
    });

    it("Gets to negative floor", () => {
        expect(day01.findFloor(")())())")).toBe(-3);
    });
});




