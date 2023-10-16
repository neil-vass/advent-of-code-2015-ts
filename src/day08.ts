import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export function lengthInCode(input: string) {
    return input.length;
}

export function lengthInMemory(input: string) {
    // We know the string has quotes at start and end - remove them.
    input = input.slice(1, -1);
    // we don't replace with the correct character here, only care about count.
    input = input.replace(/(\\")|(\\\\)|(\\x\w\w)/g, `_`);
    return input.length;
}

export function lengthWhenEncoded(input: string) {
    // We'd add a " at the start and end.
    let encodedLength = input.length + 2;
    for (const c of input) {
        if (c === `"` || c == `\\`) {
            encodedLength += 1; // we'd add a backslash before these.
        }
    }
    return encodedLength;
}

export async function findDifference(filepath: string, left: (s: string) => number, right: (s: string) => number) {
    const lines = linesFromFile(filepath);
    const differences = lines.map(ln => left(ln) - right(ln));
    return Sequence.sum(differences);
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day08.txt";
    console.log(await findDifference(filepath, lengthInCode, lengthInMemory));
    console.log(await findDifference(filepath, lengthWhenEncoded, lengthInCode));
}
