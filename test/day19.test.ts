import {expect, describe, it} from "vitest";
import * as day19 from "../src/day19";
import {Sequence} from "../src/sequence";


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
        ]
        const startingMolecule = "HOH";

        const molecules = day19.distinctMolecules(replacements, startingMolecule);
        expect(molecules.size).toBe(4);
    });
});