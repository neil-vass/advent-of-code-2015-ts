import {linesFromFile} from "./helpers.js";
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
            return this.distances.get(`${from}-${to}`);
        if(this.distances.has(`${to}-${from}`))
            return this.distances.get(`${to}-${from}`);
        throw new Error(`Don't know distance between ${from} and ${to}`);
    }
}

export function permutations<T>(arr: T[]) {

    // Heap's algorithm: a "decrease and conquer" method.
    // Operates on 'k' elements of the array at each step
    // (k starts at array's length and decreases by one each step).
    function* generatePermutations<T>(arr: T[], k: number = arr.length): Iterable<T[]> {
        if (k === 1) {
            yield [...arr];
        } else {
            for (let i = 0; i < k; i++) {
                yield* generatePermutations(arr, k - 1);
                if (k % 2 === 0) {
                    [arr[i], arr[k-1]] = [arr[k-1], arr[i]];
                }
                else {
                    [arr[0], arr[k-1]] = [arr[k-1], arr[0]];
                }
            }
        }
    }

    return new Sequence(generatePermutations(arr));
}


export async function calculateRoutes(input: Sequence<string>) {
    const distanceTable = new DistanceTable();

    for await (const s of input) {
        const m = s.match(/^(\w+) to (\w+) = (\d+)$/);
        if (!m) throw new Error(`Unexpected line: "${s}"`);

        const [from, to, distance] = m.slice(1);
        distanceTable.store(from, to, +distance);
    }


}


export function fn(filepath: string) {
    return "Hello, World!";
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day09.txt";
    console.log(fn(filepath));

    for await (const p of permutations(["a", "b"])) {
        console.log(JSON.stringify(p));
    }


}
