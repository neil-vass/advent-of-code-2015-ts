import {expect, describe, it} from "vitest";
import {linesFromFile} from "../src/file_helpers.js";

describe("#linesFromFile", () => {
    it("Returns all lines", async () => {
        const lineReader = linesFromFile("./test/data/example-file.txt");
        const results = await lineReader.toArray();

        expect(results.length).toBe(3);
        expect(results[2]).toBe("And here's line 3");
    });

    it("Throws if file is missing", async () => {
        const lineReader = linesFromFile("./test/data/not-a-file.txt");
        expect(async () => { for await (const line of lineReader) {} })
            .rejects
            .toThrow("no such file or directory");
    });
});

describe("#createObjectFromEntries", () => {
    it("Creates object from given key, value arrays", () => {

    });
});