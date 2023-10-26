import {expect, describe, it, beforeEach} from "vitest";
import * as day15 from "../src/day15";
import {Cookie} from "../src/day15";

const testFilename = "./test/data/day15.txt"

describe("#ingredientFromDescription", () => {
    it("Turns string into object", () => {
        const description = "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8";
        expect(day15.ingredientFromDescription(description)).toStrictEqual({
            name: "Butterscotch", capacity: -1, durability: -2, flavor: 6, texture: 3, calories: 8
        });
    });
});

describe("CookieMixer class", () => {

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
});