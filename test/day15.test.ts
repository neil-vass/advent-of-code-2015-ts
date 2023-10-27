import {expect, describe, it, beforeEach} from "vitest";
import * as day15 from "../src/day15";
import {Cookie} from "../src/day15";
import {Sequence} from "../src/sequence";

const testFilename = "./test/data/day15.txt"

describe("#ingredientFromDescription", () => {
    it("Turns string into object", () => {
        const description = "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8";
        expect(day15.ingredientFromDescription(description)).toStrictEqual({
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
            "Frosting: capacity 4, durability -2, flavor 0, texture 0, calories 5",
            "Candy: capacity 0, durability 5, flavor -1, texture 0, calories 8",
            "Butterscotch: capacity -1, durability 0, flavor 5, texture 0, calories 6",
            "Sugar: capacity 0, durability 0, flavor -2, texture 2, calories 1"
        ]);

        expect(await day15.bestCookieScore(lines)).toBe(15862900);
    });

    it("Works out permutations", async ()=> {

        function permutations(balls: number, buckets: number) {

            function *choose(balls: number, buckets: number) {
                if (buckets === 1) {
                    yield [balls]
                } else {
                    for (let i=0; i<=balls; i++) {
                        for (const response of choose(balls-i, buckets-1)) {
                            yield [i].concat(response)
                        }
                    }
                }
            }

            return new Sequence(choose(balls, buckets));
        }


        const balls = 100;
        const buckets = 4;
        const combos = await permutations(balls, buckets).toArray();
        //console.log(combos);
        console.log(combos.length);
       // expect(combos.length).toBe(3);

          //  [[0,2], [1,1], [2,0]]);
    });
});
