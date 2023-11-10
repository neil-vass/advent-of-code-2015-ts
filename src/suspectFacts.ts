const suspectFacts = new Map([
    ["children", 3],
    ["cats", 7],
    ["samoyeds", 2],
    ["pomeranians", 3],
    ["akitas", 0],
    ["vizslas", 0],
    ["goldfish", 5],
    ["trees", 3],
    ["cars", 2],
    ["perfumes", 1],
]);

export class Sue {
    public readonly id;
    private readonly knownFacts;

    constructor(id: number, knownFacts: [string, number][]) {
        this.id = id;
        this.knownFacts = new Map(knownFacts);
    }

    fitsTheFacts() {
        for (const [key, val] of suspectFacts) {
            if (this.knownFacts.has(key) && (this.knownFacts.get(key) !== val)) {
                return false;
            }
        }
        return true;
    }
}