import {linesFromFile, permutations} from "./helpers.js";
import {Sequence} from "./sequence.js";

export class DistanceTable {
    private readonly cities = new Set<string>();
    private readonly distances = new Map<string, number>();

    store(from: string, to: string, distance: number) {
        this.cities.add(from);
        this.cities.add(to);
        this.distances.set(`${from}-${to}`, distance);
    }

    allCities() {
        return [...this.cities];
    }

    distance(from: string, to: string) {
        if(this.distances.has(`${from}-${to}`))
            return this.distances.get(`${from}-${to}`)!;
        if(this.distances.has(`${to}-${from}`))
            return this.distances.get(`${to}-${from}`)!;
        throw new Error(`Don't know distance between ${from} and ${to}`);
    }
}


export async function calculateRoutes(input: Sequence<string>) {
    const distanceTable = new DistanceTable();

    for await (const s of input) {
        const m = s.match(/^(\w+) to (\w+) = (\d+)$/);
        if (!m) throw new Error(`Unexpected line: "${s}"`);

        const [from, to, distance] = m.slice(1);
        distanceTable.store(from, to, +distance);
    }

    return permutations(distanceTable.allCities()).map(cities => {
        let route = cities[0];
        let distance = 0;
        for (let i=1; i < cities.length; i++) {
            route += ` -> ${cities[i]}`;
            distance += distanceTable.distance(cities[i-1], cities[i]);
        }
        return {route, distance};
    });
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const lines = linesFromFile("./src/data/day09.txt");
    const choices = await calculateRoutes(lines);
    const best = await Sequence.maxObject(choices, "distance");
    console.log(best.distance);
}
