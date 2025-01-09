import {expect, describe, it, beforeEach} from "vitest";
import {bestCookieScore, Cookie, ingredientFromDescription, waysToAllocate} from "../src/day15.js";
import {Sequence} from "../src/sequence.js";

describe("#ingredientFromDescription", () => {
    it("Turns string into object", () => {
        const description = "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8";
        expect(ingredientFromDescription(description)).toStrictEqual({
            name: "Butterscotch", capacity: -1, durability: -2, flavor: 6, texture: 3, calories: 8
        });
    });
});

describe("Cookie class", () => {

    const butterscotch = { name: "Butterscotch", capacity: -1, durability: -2, flavor: 6, texture: 3, calories: 8 };
    const cinnamon = { name: "Cinnamon", capacity: 2, durability: 3, flavor: -2, texture: -1, calories: 3 };


    it("Takes amounts of ingredients and gives cookie properties", () => {
        const cookie = Cookie.mix(44, butterscotch).with(56, cinnamon).bake();

        expect(cookie.properties).toStrictEqual({
            capacity: 68, durability: 80, flavor: 152, texture: 76
        });
    });

    it("Negative property totals become zero", () => {
        const cookie = Cookie.mix(99, butterscotch).with(1, cinnamon).bake();

        expect(cookie.properties).toStrictEqual({
            capacity: 0, durability: 0, flavor: 592, texture: 296
        });
    });

    it("Finds the perfect cookie", async () => {
        const score = await Cookie.bestCookieScoreFrom(100, [butterscotch, cinnamon]);
        expect(score).toBe(57600000);
    });
});

describe("End-to-end: description lines to cookie score", () => {

    it("4 lines", async () => {
        const lines = new Sequence([
            "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
            "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3"
        ]);

        expect(await bestCookieScore(lines)).toBe(57600000);
    });

    it("Works out permutations", async () => {
        const combos = await waysToAllocate(2, 2).toArray();
        expect(combos.length).toBe(3);
        expect(combos).toContainEqual([0,2]);
        expect(combos).toContainEqual([1,1]);
        expect(combos).toContainEqual([2,0]);
    });
});
