import {expect, describe, it} from "vitest";
import * as day04 from "../src/day04";

describe("Finding MD5 hashes", () => {
    it("Combining example keys and seed numbers gives expected hashes", () => {
        expect(day04.md5HashOf("abcdef609043")).toMatch(/^000001dbbfa/);
    });

    it("#seedNumberFor returns number to be use with given keys", () => {
        expect(day04.seedNumberFor("abcdef")).toBe(609043);
        expect(day04.seedNumberFor("pqrstuv")).toBe(1048970);
    });
});