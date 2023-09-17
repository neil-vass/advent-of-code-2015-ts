import {expect, describe, it} from "vitest";
import * as utils from "../src/aoc-utils";


async function toArray<T>(sequence: utils.Sequence<T>) {
    let results: T[] = [];
    for await (const x of sequence) {
        results.push(x);
    }
    return results;
}

describe("#linesFromFile", () => {
    it("Returns all lines", async () => {
        const lineReader = utils.linesFromFile("./test/data/example-file.txt");
        const results = await toArray(lineReader);

        expect(results.length).toBe(3);
        expect(results[2]).toBe("And here's line 3");
    });

    it("Throws if file is missing", async () => {
        const lineReader = utils.linesFromFile("./test/data/not-a-file.txt");
        expect(async () => { for await (const line of lineReader) {} })
            .rejects
            .toThrow("no such file or directory");
    });
});

describe("#map with #linesFromFile", () => {
    it("Maps over an array", async () => {
        const doubles = utils.map([1, 2, 3], x => x * 2);
        const results = await toArray(doubles);
        expect(results).toStrictEqual([2,4,6])
    });

    it("Maps over lines from a file", async () => {
        const lines = utils.linesFromFile("./test/data/example-file.txt");
        const justNums = utils.map(lines, x => Number(x.match(/\d+/)));

        const results = await toArray(justNums);
        expect(results).toStrictEqual([1, 2, 3]);
    });
});

describe("#sum with #map and #linesFromFile", () => {
    it("Sums array", async () => {
       const total = await utils.sum([1, 2, 3]);
       expect(total).toBe(6);
    });

    it("Sums values taken from file and manipulated", async () => {
        const lines = utils.linesFromFile("./test/data/example-file.txt");
        const extractNums = utils.map(lines, s => Number(s.match(/\d+/)));
        const doubleNums = utils.map(extractNums, n => n*2);

        // So far: nothing's been pulled from the file, nothing's been processed.
        const total = await utils.sum(doubleNums);
        expect(total).toBe(12);
    });
});