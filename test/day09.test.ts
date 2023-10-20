import {expect, describe, it, beforeEach} from "vitest";
import * as day09 from "../src/day09";
import {Sequence} from "../src/sequence";
import {DistanceTable} from "../src/day09";

describe("DistanceTable class", () => {
    it("Remembers entries", () => {
        const dt = new DistanceTable();
        dt.store("London", "Dublin", 464);
        dt.store("London", "Belfast", 518);
        dt.store("Dublin", "Belfast", 141);

        expect(dt.allCities().sort()).toStrictEqual(["London", "Belfast", "Dublin"].sort());
        expect(dt.distance("London", "Dublin")).toBe(464);
        expect(dt.distance("Dublin", "London")).toBe(464);
    });


});

describe("#calculateRoutes", () => {

    let sampleInput: Sequence<string>;

    beforeEach(()=> {
        sampleInput = new Sequence([
            "London to Dublin = 464",
            "London to Belfast = 518",
            "Dublin to Belfast = 141",
        ]);
    });

    it("Finds distances for all possible route permutations", async () => {
        const results = await day09.calculateRoutes(sampleInput);
        expect(results).toStrictEqual([
            { route: "Dublin -> London -> Belfast", distance: 982 },
            { route: "London -> Dublin -> Belfast", distance: 605 },
            { route: "London -> Belfast -> Dublin", distance: 659 },
            { route: "Dublin -> Belfast -> London", distance: 659 },
            { route: "Belfast -> Dublin -> London", distance: 605 },
            { route: "Belfast -> London -> Dublin", distance: 982 }
        ])
    });
});

describe("#permutations", () => {

    it("Returns 1 permutation for 1-element array", async () => {
        const allPermutations = await day09.permutations(["A"]).toArray();
        expect(allPermutations).toStrictEqual([["A"]]);
    });

    it("Returns 2 permutation for 2-element array", async () => {
        const allPermutations = await day09.permutations(["a", "b"]).toArray();
        expect(allPermutations.length).toBe(2);
        expect(allPermutations).toEqual(expect.arrayContaining([
            ["a", "b"],
            ["b", "a"]
        ]));
    })

    it("Returns 6 permutation for 3-element array", async () => {
        const allPermutations = await day09.permutations([1,2,3]).toArray();
        expect(allPermutations.length).toBe(6);
        expect(allPermutations).toEqual(expect.arrayContaining([
            [1,2,3],
            [2,1,3],
            [3,1,2],
            [1,3,2],
            [2,3,1],
            [3,2,1]
        ]));
    });
});