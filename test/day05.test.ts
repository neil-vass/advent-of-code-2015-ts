import {expect, describe, it} from "vitest";
import * as day05 from "../src/day05";
import {Sequence} from "../src/sequence";

const testFilename = "./test/data/day05.txt"

describe("Finding nice strings", () => {
    it("Contains at least 3 vowels", () => {
        expect(day05.containsAtLeast3Vowels("aei")).toBeTruthy();
        expect(day05.containsAtLeast3Vowels("xazegov")).toBeTruthy();
        expect(day05.containsAtLeast3Vowels("aeiouaeiouaeiou")).toBeTruthy();

        expect(day05.containsAtLeast3Vowels("aeg")).toBeFalsy();
        expect(day05.containsAtLeast3Vowels("qwzvbg")).toBeFalsy();
        expect(day05.containsAtLeast3Vowels("")).toBeFalsy();
    });

    it("Contains a letter that appears twice in a row", () => {
        expect(day05.containsRepeatedLetter("xx")).toBeTruthy();
        expect(day05.containsRepeatedLetter("abcdde")).toBeTruthy();
        expect(day05.containsRepeatedLetter("aabbccdd")).toBeTruthy();

        expect(day05.containsRepeatedLetter("aega")).toBeFalsy();
        expect(day05.containsRepeatedLetter("qwzvbg")).toBeFalsy();
        expect(day05.containsRepeatedLetter("")).toBeFalsy();
    });

    it("Does not contain forbidden pairs (ab, cd, pq, or xy)", () => {
        expect(day05.doesNotContainForbiddenPairs("aeb")).toBeTruthy();
        expect(day05.doesNotContainForbiddenPairs("bcaaaaa")).toBeTruthy();
        expect(day05.doesNotContainForbiddenPairs("")).toBeTruthy();

        expect(day05.doesNotContainForbiddenPairs("abei")).toBeFalsy();
        expect(day05.doesNotContainForbiddenPairs("ccdd")).toBeFalsy();
        expect(day05.doesNotContainForbiddenPairs("pqxy")).toBeFalsy();
    });

    it("Filters list of strings using these rules", async () => {
        const strings = new Sequence([
            "ugknbfddgicrmopn",
            "aaa",
            "jchzalrnumimnmhp",
            "haegwjzuvuyypxyu",
            "dvszwmarrgswjxmb"
        ]);

        expect(await day05.countNiceStrings(strings)).toBe(2);
    });
});

describe("Finding nice strings, part 2", () => {
    it("A pair appears twice without overlapping", () => {
        expect(day05.aPairAppearsTwiceWithoutOverlapping("xyxy")).toBeTruthy();
        expect(day05.aPairAppearsTwiceWithoutOverlapping("aabcdefgaa")).toBeTruthy();

        expect(day05.aPairAppearsTwiceWithoutOverlapping("aaa")).toBeFalsy();
        expect(day05.aPairAppearsTwiceWithoutOverlapping("qwzvbg")).toBeFalsy();
        expect(day05.aPairAppearsTwiceWithoutOverlapping("")).toBeFalsy();
    });

    it("A letter repeats with one letter in between", () => {
        expect(day05.aLetterRepeatsWithOneLetterInBetween("xyx")).toBeTruthy();
        expect(day05.aLetterRepeatsWithOneLetterInBetween("abcdefeghi")).toBeTruthy();
        expect(day05.aLetterRepeatsWithOneLetterInBetween("aaa")).toBeTruthy();

        expect(day05.aLetterRepeatsWithOneLetterInBetween("aafrp")).toBeFalsy();
        expect(day05.aLetterRepeatsWithOneLetterInBetween("abba")).toBeFalsy();
        expect(day05.aLetterRepeatsWithOneLetterInBetween("")).toBeFalsy();
    });

    it("Filters list of strings using these rules", async () => {
        const strings = new Sequence([
            "qjhvhtzxzqqjkmpb",
            "xxyxx",
            "uurcxstgmygtbstg",
            "ieodomkazucvgmuy"
        ]);

        expect(await day05.countNiceStringsPart2(strings)).toBe(2);
    });
});