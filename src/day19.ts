import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";
import {A_starSearch} from "./graphSearch.js";
import { pathToFileURL } from 'url'


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
    const mols = new Set<string>();
    for(const [from, to] of replacements) {
        const re = new RegExp(from, "g");
        for (const m of startingMolecule.matchAll(re)) {
            const molecule = startingMolecule.slice(0, m.index) + to + startingMolecule.slice(m.index! + from.length);
            mols.add(molecule);
        }
    }
    return mols;
}


function depthFirstSearch(replacements: [string, string][], startingPoint: string, target: string) {
    const explored = new Set<string>([startingPoint]);
    const queue: [string, number][] = [[startingPoint, 1]];
    while (queue.length > 0) {
        const [v, pathLength] = queue.shift()!;
        if (v === target) {
            return pathLength;
        }
        for (const possibleNextStep of distinctMolecules(replacements, v)) {
            if (possibleNextStep.length <= target.length && !explored.has(possibleNextStep)) {
                explored.add(possibleNextStep);
                queue.push([possibleNextStep, pathLength+1])
            }
        }
    }
    return Infinity;
}

export function fewestStepsToMakeDFS(replacements: [string, string][], medicineMolecule: string) {
    // the set returned by "distinctMolecule" is our possible next step.
    // So, we can explore using DFS or BFS and see what is the best path.
    // If: mol from next step is longer than target, we know to give up.
    const firstSteps = replacements.filter(([from, to]) => from === "e").map(([from, to]) => to);
    const distances = firstSteps.map(fs => depthFirstSearch(replacements, fs, medicineMolecule));
    return Math.min(...distances);
}

class MoleculeConstructor {

    constructor(private readonly replacements: Array<[string, string]>, private readonly target: string) {}

    neighbours(node: string): Iterable<{node: string, cost: number}> {
        if (node.length >= this.target.length) return [];
        const nextMoves = distinctMolecules(this.replacements, node);
        const choices = [...nextMoves]
        return choices.map(node => ({ node, cost: 1}));
    }

    heuristic(from: string, to: string): number {
        return 0;
    }
}

// Searches through the space of all possible replacements; won't work on the real input,
// the space is far too big.
export function fewestStepsToMake(replacements: [string, string][], medicineMolecule: string) {
    const graph = new MoleculeConstructor(replacements, medicineMolecule);
    const start = "e";
    const goal = medicineMolecule;
    const searchResults = A_starSearch(graph, start, goal);
    console.log(searchResults.size)
    return searchResults.get(goal)?.costSoFar;
}

// I did my very best to work things out on my own, but had to go looking for ideas.
// https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4etju describes how
// some symbols in the molecule mean "( , )" and the rules around these.
// Don't think I would ever have discovered that!
export function calculateStepsCleverly(medicineMolecule: string) {
    const elements = medicineMolecule.match(/[A-Z]/g)!.length;
    const openParens = medicineMolecule.match(/Rn/g)!.length;
    const commas = medicineMolecule.match(/Y/g)!.length;
    const closeParens = medicineMolecule.match(/Ar/g)!.length;
    return elements - openParens - 2*commas - closeParens -1;
}


// If this script was invoked directly on the command line:
if(pathToFileURL(process.argv[1]).href === import.meta.url) {
    const input = linesFromFile("./src/data/day19.txt");
    const [replacements, startingMolecule] = await parse(input);
    const molecules = distinctMolecules(replacements, startingMolecule);
    console.log(`Part 1: ${molecules.size}`);

    const medicineMolecule = startingMolecule;
    // const fewestSteps = fewestStepsToMake(replacements, medicineMolecule);
    const fewestSteps = calculateStepsCleverly(medicineMolecule)
    console.log(`Part 2: ${fewestSteps}`);
}
