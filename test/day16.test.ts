import {expect, describe, it} from "vitest";
import * as day16 from "../src/day16";

const testFilename = "./test/data/day16.txt"

describe("#fn", () => {
    it("runs", () => {
        expect(day16.fn(testFilename)).toBe("a real test");
    });
});