import {expect, describe, it} from "vitest";
import * as day10 from "../src/day10";


describe("#lookAndSay", () => {
    it("Returns empty string for empty input", () => {
        expect(day10.lookAndSay("")).toBe("");
    });

    it("Matches example cases", () => {
        expect(day10.lookAndSay("1")).toBe("11");
        expect(day10.lookAndSay("11")).toBe("21");
        expect(day10.lookAndSay("21")).toBe("1211");
        expect(day10.lookAndSay("1211")).toBe("111221");
        expect(day10.lookAndSay("111221")).toBe("312211");
    });

    it("Applies process multiple times", () => {
        expect(day10.iterateLookAndSay("1", 5)).toBe("312211");
    });
});