import {expect, describe, it} from "vitest";
const utils = require("../src/aoc-utils");

describe("#linesFromFile", () => {
    it("Returns all lines", async () => {
        const lineReader = utils.linesFromFile("./test/data/example-file.txt");
        let results: string[] = []
        for await (const line of lineReader) {
            results.push(line);
        }
        expect(results.length).toBe(3);
        expect(results[2]).toBe("And here's line 3");
    });

    it("Throws if file is missing", async () => {
        let errorCaught = false;
        try {
            const lineReader = utils.linesFromFile("./test/data/not-a-file.txt");
            await lineReader.next();
        } catch (err) {
            expect(err.message).toMatch(/no such file or directory/);
            errorCaught = true;
        }

        expect(errorCaught).toBe(true);
    });
});

describe("#map", () => {
    it("Maps over an array", async () => {
        const doubles = utils.map(x => x*2, [1,2,3]);
        let results: number[] = [];
        for await (const n of doubles) {
            results.push(n);
        }
        expect(results).toStrictEqual([2,4,6])
    });
});