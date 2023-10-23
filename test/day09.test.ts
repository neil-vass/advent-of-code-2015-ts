import {beforeEach, describe, expect, it, test} from "vitest";
import * as day09 from "../src/day09";
import {DistanceTable} from "../src/day09";
import {Sequence} from "../src/sequence";
import {permutations} from "../src/helpers";

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

describe("#permutations", () => {

    it("Returns 1 permutation for 1-element array", async () => {
        const allPermutations = await permutations(["A"]).toArray();
        expect(allPermutations).toStrictEqual([["A"]]);
    });

    it("Returns 2 permutation for 2-element array", async () => {
        const allPermutations = await permutations(["a", "b"]).toArray();
        expect(allPermutations.length).toBe(2);
        expect(allPermutations).toStrictEqual(expect.arrayContaining([
            ["a", "b"],
            ["b", "a"]
        ]));
    })

    it("Returns 6 permutation for 3-element array", async () => {
        const allPermutations = await permutations([1,2,3]).toArray();
        expect(allPermutations.length).toBe(6);
        expect(allPermutations).toStrictEqual(expect.arrayContaining([
            [1,2,3],
            [2,1,3],
            [3,1,2],
            [1,3,2],
            [2,3,1],
            [3,2,1]
        ]));
    });

});

describe("Route finding", () => {

    let sampleInput: Sequence<string>;

    beforeEach(()=> {
        sampleInput = new Sequence([
            "London to Dublin = 464",
            "London to Belfast = 518",
            "Dublin to Belfast = 141",
        ]);
    });

    test("#calculateRoutes Finds distances for all possible route permutations", async () => {
        // Lots of awaiting to unpick this - I think this method's doing too much.
        const hmm = await day09.calculateRoutes(sampleInput);
        const results = await hmm.toArray();
        expect(results.length).toBe(6);
        expect(results).toStrictEqual(expect.arrayContaining([
            { route: "Dublin -> London -> Belfast", distance: 982 },
            { route: "London -> Dublin -> Belfast", distance: 605 },
            { route: "London -> Belfast -> Dublin", distance: 659 },
            { route: "Dublin -> Belfast -> London", distance: 659 },
            { route: "Belfast -> Dublin -> London", distance: 605 },
            { route: "Belfast -> London -> Dublin", distance: 982 }
        ]))
    });
});