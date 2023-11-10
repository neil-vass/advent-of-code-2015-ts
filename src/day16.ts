import {Sue} from "./suspectFacts.js";

export function sueFromDescription(description: string) {
    //"Sue 405: akitas: 1, vizslas: 6, perfumes: 6"
    const m = description.match(/^Sue (\d+): (.+)$/);
    if (!m) throw new Error(`Unexpected line format ${description}`);
    const [, id, factsStr] = m;

    factsStr.split(',').forEach()
    return new Sue(1, []);
}
export function fn(filepath: string) {
    return "Hello, World!";
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day16.txt";
    console.log(fn(filepath));
}
