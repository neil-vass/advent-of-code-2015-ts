import {expect, describe, it} from "vitest";
import * as day03 from "../src/day03";

const testFilename = "./test/data/day03.txt"

describe("#fn", () => {
    it("runs", () => {
        expect(day03.fn(testFilename)).toBe("Write a real test");
    });
});