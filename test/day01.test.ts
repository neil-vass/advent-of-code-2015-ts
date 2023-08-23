import {expect, test, describe, it} from "vitest";
const day01 = require("../src/day01")

describe("Vitest setup", () => {
    it("Makes simple comparisons", () => {
        expect(1).toBe(1);
    });

    it("Can call src files", () => {
        expect(day01.callMe()).toBe("Hi!");
    });
});




