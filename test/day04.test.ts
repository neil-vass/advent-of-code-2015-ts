import {describe, expect, it} from "vitest";
import * as day04 from "../src/day04.js";

// Takes a few seconds - remove `.skip` to run this.
describe.skip("Finding MD5 hashes", () => {
    it("#seedNumberFor returns number to be use with given keys", () => {
        expect(day04.seedNumberFor("abcdef")).toBe(609043);
        expect(day04.seedNumberFor("pqrstuv")).toBe(1048970);
    });
});