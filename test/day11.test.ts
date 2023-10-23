import {expect, describe, it} from "vitest";
import * as day11 from "../src/day11";

describe("Password rules", () => {
    it("Must have a straight of 3 letters", () => {
        expect(day11.hasStraightOf3("abc")).toBeTruthy();
        expect(day11.hasStraightOf3("ffbcdx")).toBeTruthy();
        expect(day11.hasStraightOf3("abd")).toBeFalsy();
    });

    it("Must not contain forbidden letters i, o, l", () => {
        expect(day11.hasNoForbiddenLetters("abd")).toBeTruthy();
        expect(day11.hasNoForbiddenLetters("abdi")).toBeFalsy();
        expect(day11.hasNoForbiddenLetters("ervmldoa")).toBeFalsy();
    });

    it("Must have 2 different, non-overlapping pairs", () => {
        expect(day11.hasTwoDifferentPairs("aazz")).toBeTruthy();
        expect(day11.hasTwoDifferentPairs("ibberccr")).toBeTruthy();
        expect(day11.hasTwoDifferentPairs("abc")).toBeFalsy();
        expect(day11.hasTwoDifferentPairs("aataa")).toBeFalsy();
    });
});

describe("#isValidPassword", () => {
    it("Example meets 'straight of 3' requirement but fails 'no forbidden letters' requirement", () => {
        expect(day11.isValidPassword("hijklmmn")).toBeFalsy();
    });

    it("Example meets the third requirement (because it repeats bb and ff) but fails the first requirement.", () => {
        expect(day11.isValidPassword("abbceffg")).toBeFalsy();
    });

    it("Example fails the third requirement, because it only has one double letter (bb).", () => {
        expect(day11.isValidPassword("abbcegjk")).toBeFalsy();
    });
});

describe("#incrementPassword", () => {
    it("Increment wraps round like numbers", () => {
        expect(day11.incrementPassword("xx")).toBe("xy");
        expect(day11.incrementPassword("xy")).toBe("xz");
        expect(day11.incrementPassword("xz")).toBe("ya");
        expect(day11.incrementPassword("ya")).toBe("yb");
    });
});

describe("#nextValidPassword", () => {
    it("Increments given password until a new valid password is found", () => {
        expect(day11.nextValidPassword("abcdefgh")).toBe("abcdffaa");
        expect(day11.nextValidPassword("ghijklmn")).toBe("ghjaabcc");
    });
});