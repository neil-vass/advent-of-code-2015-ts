import {expect, describe, it} from "vitest";
import * as day19 from "../src/day19";
import {Sequence} from "../src/sequence";
import {MinPriorityQueue, SlowMinPriorityQueue} from "../src/helpers";


describe("Part 1", () => {
    it("Parses input", async () => {
        const input = new Sequence([
            "H => HO",
            "H => OH",
            "O => HH",
            "",
            "HOH"]);

        const [replacements, startingMolecule] = await day19.parse(input);
        expect(replacements.length).toBe(3);
        expect(replacements[0]).toStrictEqual(["H", "HO"]);
        expect(startingMolecule).toBe("HOH");
    });

    it("Finds all replacements", () => {
        const replacements: [string, string][] =[
            ["H", "HO"],
            ["H", "OH"],
            ["O", "HH"],
        ];
        const startingMolecule = "HOH";

        const molecules = day19.distinctMolecules(replacements, startingMolecule);
        expect(molecules.size).toBe(4);
    });
});

describe("Part 2", () => {

    it("Uses a priority queue", () => {
        const queue = new MinPriorityQueue();
        queue.push("A", 5);
        queue.push("B", 10);
        queue.push("C", 2);

        expect(queue.pullMinElement()).toBe("C");

        queue.push("E", 6);
        queue.push("D", 12);

        expect(queue.pullMinElement()).toBe("A");
        expect(queue.pullMinElement()).toBe("E");
        expect(queue.pullMinElement()).toBe("B");
        expect(queue.pullMinElement()).toBe("D");
        expect(queue.pullMinElement()).toBeNull();

    });

    it("Solves a very basic question", () => {
        const replacements: [string, string][] =[
            ["e", "H"],
            ["e", "O"],
            ["H", "HO"],
        ];
        const medicineMolecule = "HO";

        expect(day19.fewestStepsToMake(replacements, medicineMolecule)).toBe(2);
    });

    it("Solves the example puzzle", () => {
        const replacements: [string, string][] =[
            ["e", "H"],
            ["e", "O"],
            ["H", "HO"],
            ["H", "OH"],
            ["O", "HH"],
        ];

        expect(day19.fewestStepsToMake(replacements, "HOH")).toBe(3);
        expect(day19.fewestStepsToMake(replacements, "HOHOHO")).toBe(6);
    });
});
