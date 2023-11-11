import {describe, expect, it, vi} from "vitest";
import {Sue, sueFromDescription} from "../src/day16";

describe("#fitsTheFacts", () => {
    it("True if the known facts about Sue fits all the facts", () => {
        const sue = new Sue(1, [["children", 3], ["samoyeds", 2]]);
        expect(sue.fitsTheFacts()).toBeTruthy();
    });

    it("False if any known facts about Sue disagrees with a fact", () => {
        const sue = new Sue(1, [["children", 3], ["samoyeds", 1]]);
        expect(sue.fitsTheFacts()).toBeFalsy();
    });

    it("Must have greater than the 7 cats given in the suspect facts", () => {
        const sue = new Sue(1, [["children", 3], ["cats", 7]]);
        expect(sue.fitsTheFacts()).toBeFalsy();

        const sue2 = new Sue(1, [["children", 3], ["cats", 10]]);
        expect(sue2.fitsTheFacts()).toBeTruthy();
    });
});

describe("#sueFromDescription", () => {
    it("Creates Sue with given facts", async () => {
        const description = "Sue 405: akitas: 1, vizslas: 6, perfumes: 6";
        sueFromDescription(description);
    });
});