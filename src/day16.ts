import {linesFromFile} from "./helpers.js";

// Let's try currying! https://javascript.info/currying-partials
function comparator(fn: (a: number, b: number) => boolean) {
    return function (target: number) {
        return function (input: number) {
            return fn(input, target);
        }
    }
}

const equalTo = comparator((a, b) => a === b);
const greaterThan = comparator((a, b) => a > b);
const lessThan = comparator((a, b) => a < b);

const suspectFacts = new Map([
    ["children", equalTo(3)],
    ["cats", greaterThan(7)],
    ["samoyeds", equalTo(2)],
    ["pomeranians", lessThan(3)],
    ["akitas", equalTo(0)],
    ["vizslas", equalTo(0)],
    ["goldfish", lessThan(5)],
    ["trees", greaterThan(3)],
    ["cars", equalTo(2)],
    ["perfumes", equalTo(1)],
]);

export class Sue {
    public readonly id;
    private readonly knownFacts;

    constructor(id: string, knownFacts: [string, number][]) {
        this.id = id;
        this.knownFacts = new Map(knownFacts);
    }

    fitsTheFacts() {
        for (const [thing, meetsRequirement] of suspectFacts) {
            const value = this.knownFacts.get(thing);
            if (value === undefined) continue;
            if (!meetsRequirement(value)) return false;
        }
        return true;
    }
}

export function sueFromDescription(description: string) {
    const m = description.match(/^Sue (\d+): (.+)$/);
    if (!m) throw new Error(`Unexpected line format ${description}`);
    const [, id, factsStr] = m;

    const facts = factsStr.split(',').map(f =>
    {
        const m = f.match(/(\w+): (\d+)/);
        if (!m) throw new Error(`Unexpected format ${f}`);
        const [, name, num] = m;
        return [name, +num] as [string, number];
    })
    return new Sue(id, facts);
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const lines = linesFromFile("./src/data/day16.txt");
    for await (const sue of lines.map(ln => sueFromDescription(ln))) {
        if (sue.fitsTheFacts()) {
            console.log(sue.id);
        }
    }
}
