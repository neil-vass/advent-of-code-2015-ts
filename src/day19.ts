import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export async function parse(input: Sequence<string>) : Promise<[Array<[string, string]>, string]> {
    let lastLine = false;
    const replacements = new Array<[string, string]>();
    for await (const ln of input) {
        if (ln === "") {
            lastLine = true;
            continue;
        }

        if (!lastLine) {
            const m = ln.match(/^(\w+) => (\w+)$/);
            if (!m) throw new Error(`Unexpected line format ${ln}`);
            const [, from, to] = m;
            replacements.push([from, to]);
        } else {
            return [replacements, ln]
        }
    }
    throw new Error(`Unexpected input format`);
}


export function distinctMolecules(replacements: Array<[string, string]>, startingMolecule: string) {
    const distinctMolecules = new Set<string>();
    for(const [from, to] of replacements) {
        const re = new RegExp(from, "g");
        for (const m of startingMolecule.matchAll(re)) {
            const molecule = startingMolecule.slice(0, m.index) + to + startingMolecule.slice(m.index! + from.length);
            distinctMolecules.add(molecule);
        }
    }
    return distinctMolecules;
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const input = linesFromFile("./src/data/day19.txt");
    const [replacements, startingMolecule] = await parse(input);
    const molecules = distinctMolecules(replacements, startingMolecule);
    console.log(molecules.size);
}
