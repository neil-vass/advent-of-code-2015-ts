import {expect, describe, it} from "vitest";
import * as day09 from "../src/day09";

const testFilename = "./test/data/day09.txt"

describe("#fn", () => {
    it("runs", () => {
        expect(day09.fn(testFilename)).toBe("a real test");
    });
});