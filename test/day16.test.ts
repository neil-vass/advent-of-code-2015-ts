import {describe, expect, it, vi} from "vitest";
import * as day16 from "../src/day16";

import {Sue} from "../src/suspectFacts";

describe("#fitsTheFacts", () => {
    it("True if the known facts about Sue fits all the facts", () => {
        const sue = new Sue(1, [["children", 3], ["cats", 7]]);
        expect(sue.fitsTheFacts()).toBeTruthy();
    });

    it("False if any known facts about Sue disagrees with a fact", () => {
        const sue = new Sue(1, [["children", 3], ["cats", 1]]);
        expect(sue.fitsTheFacts()).toBeFalsy();
    });
});

describe("#sueFromDescription", () => {
    it("Creates Sue with given facts", async () => {
        const description = "Sue 405: akitas: 1, vizslas: 6, perfumes: 6";
        vi.mock("../src/suspectFacts");
        day16.sueFromDescription(description);
        expect(Sue).toHaveBeenCalledOnce();

    });
});