import {expect, describe, it, test} from "vitest";
import * as day08 from "../src/day08";
import {linesFromFile} from "../src/helpers";

// In this challenge: we're looking at strings read from file, with no
// interpretation of special chars - so we can't easily use string literals
// in tests. We fetch lines from this file instead.
const testFilename = "./test/data/day08.txt"

describe("Difference between chars in code and in memory", () => {
    it("Handles just double quotes", async () => {
        // ""
        const justDoubleQuotes = (await linesFromFile(testFilename).toArray())[0];
        expect(day08.lengthInCode(justDoubleQuotes)).toBe(2);
        expect(day08.lengthInMemory(justDoubleQuotes)).toBe(0);
    });

    it("Handles string surrounded by quotes", async () => {
        // "abc"
        const stringSurroundedByQuotes = (await linesFromFile(testFilename).toArray())[1];
        expect(day08.lengthInCode(stringSurroundedByQuotes)).toBe(5);
        expect(day08.lengthInMemory(stringSurroundedByQuotes)).toBe(3);
    });

    it("Handles escaped double quotes", async () => {
        // "aaa\"aaa"
        const escapedDoubleQuotes = (await linesFromFile(testFilename).toArray())[2];
        expect(day08.lengthInCode(escapedDoubleQuotes)).toBe(10);
        expect(day08.lengthInMemory(escapedDoubleQuotes)).toBe(7);
    });

    it("Handles escaped backslash", async () => {
        // "e\\i"
        const escapedDoubleQuotes = (await linesFromFile(testFilename).toArray())[3];
        expect(day08.lengthInCode(escapedDoubleQuotes)).toBe(6);
        expect(day08.lengthInMemory(escapedDoubleQuotes)).toBe(3);
    });

    it("Handles hexadecimal escapes", async () => {
        // "\x27"
        const hexEscape = (await linesFromFile(testFilename).toArray())[4];
        expect(day08.lengthInCode(hexEscape)).toBe(6);
        expect(day08.lengthInMemory(hexEscape)).toBe(1);
    });

    it("Handles two escaped backslashes in a row", async () => {
        // "an\\\\"
        const hexEscape = (await linesFromFile(testFilename).toArray())[5];
        expect(day08.lengthInCode(hexEscape)).toBe(8);
        expect(day08.lengthInMemory(hexEscape)).toBe(4);
    });
});

describe("Difference between chars in code and when encoded", () => {
    it("Handles just double quotes", async () => {
        // "" becomes "\"\""
        const justDoubleQuotes = (await linesFromFile(testFilename).toArray())[0];
        expect(day08.lengthInCode(justDoubleQuotes)).toBe(2);
        expect(day08.lengthWhenEncoded(justDoubleQuotes)).toBe(6);
    });

    it("Handles string surrounded by quotes", async () => {
        // "abc" becomes "\"abc\""
        const stringSurroundedByQuotes = (await linesFromFile(testFilename).toArray())[1];
        expect(day08.lengthInCode(stringSurroundedByQuotes)).toBe(5);
        expect(day08.lengthWhenEncoded(stringSurroundedByQuotes)).toBe(9);
    });

    it("Handles escaped double quotes", async () => {
        // "aaa\"aaa" becomes "\"aaa\\\"aaa\""
        const escapedDoubleQuotes = (await linesFromFile(testFilename).toArray())[2];
        expect(day08.lengthInCode(escapedDoubleQuotes)).toBe(10);
        expect(day08.lengthWhenEncoded(escapedDoubleQuotes)).toBe(16);
    });

    it("Handles escaped backslash", async () => {
        // "e\\i" becomes "\"e\\\\i\""
        const escapedDoubleQuotes = (await linesFromFile(testFilename).toArray())[3];
        expect(day08.lengthInCode(escapedDoubleQuotes)).toBe(6);
        expect(day08.lengthWhenEncoded(escapedDoubleQuotes)).toBe(12);
    });

    it("Handles hexadecimal escapes", async () => {
        // "\x27" becomes "\"\\x27\""
        const hexEscape = (await linesFromFile(testFilename).toArray())[4];
        expect(day08.lengthInCode(hexEscape)).toBe(6);
        expect(day08.lengthWhenEncoded(hexEscape)).toBe(11);
    });
});