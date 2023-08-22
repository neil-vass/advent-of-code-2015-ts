import { expect, test } from "vitest"
import day01 from "../src/day01";


test("Testing works", () => {
    expect(1).toBe(1);
});

test("calling src files works", () => {
    expect(day01.callMe()).toBe("Hi!");
});

