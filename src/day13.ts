import {linesFromFile, permutations} from "./helpers.js";

export async function loadRulesFromFile(filepath: string, arranger: SeatingArranger) {
    for await (const line of linesFromFile(filepath)) {
        const m = line.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/);
        if (!m) throw new Error(`Unexpected line format: "${line}"`);
        const [, subject, direction, happiness, whenNextTo] = m;

        const happinessChange = (direction === "gain") ? +happiness : (-1 * +happiness);
        arranger.store(subject, happinessChange, whenNextTo);
    }
}


export class SeatingArranger {
    private rules = new Map<string, Map<string, number>>()

    store(subject: string, happinessChange: number, whenNextTo: string) {
        if(!this.rules.has(subject)) {
            this.rules.set(subject, new Map<string, number>());
        }
        this.rules.get(subject)!.set(whenNextTo, happinessChange);
    }

    async optimalHappiness() {
        let bestHappinessFound = 0;
        const [anchor, ...others] = [...this.rules.keys()];

        for await (const arrangement of permutations(others)) {
            arrangement.unshift(anchor);
            let happinessForThisArrangement = 0;
            for (let i = 0; i < arrangement.length; i++) {

                if (i == arrangement.length - 1) {
                    if (arrangement.length > 2) {
                        happinessForThisArrangement += this.rules.get(arrangement[i])!.get(arrangement[0])!;
                        happinessForThisArrangement += this.rules.get(arrangement[0])!.get(arrangement[i])!;
                    }
                } else {
                    happinessForThisArrangement += this.rules.get(arrangement[i])!.get(arrangement[i + 1])!;
                    happinessForThisArrangement += this.rules.get(arrangement[i + 1])!.get(arrangement[i])!;
                }
            }

            if (happinessForThisArrangement > bestHappinessFound) {
                bestHappinessFound = happinessForThisArrangement;
            }
        }

        return bestHappinessFound;
    }

    addMe() {
        const myHappiness = new Map<string, number>();
        for(const p of this.rules.keys()) {
            this.rules.get(p)!.set("Me", 0);
            myHappiness.set(p, 0);
        }
        this.rules.set("Me", myHappiness);
    }
}

async function findOptimalHappiness(filepath: string, includeMe: boolean = false) {
    const arranger = new SeatingArranger();
    await loadRulesFromFile(filepath, arranger);
    if (includeMe) {
        arranger.addMe();
    }
    return arranger.optimalHappiness();
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day13.txt";
    console.log(await findOptimalHappiness(filepath));
    console.log(await findOptimalHappiness(filepath, true));
}

