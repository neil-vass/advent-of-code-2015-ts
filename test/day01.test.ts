import {expect, test} from "vitest";
const day01 = require("../src/day01.js")


test("Trivial comparison works", () => {
    expect(1).toBe(1);
});


test("calling src files works", () => {
    expect(day01.callMe()).toBe("Hi!");
});


