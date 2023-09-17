import fs from "fs";
import readline from "node:readline/promises";

// This kind of support is likely to be part of the language soon!
// https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-async-iterator-helpers
// Until it's available, I've written this helper module.


// A sequence is anything we can keep asking for more T's from.
// Might be an array (or anything using the Iterable interface),
// a generator, and it might be async (e.g. keep requesting the next
// line from a file or other IO-bound operation we want to await).
//
// Users of this type should assume it's async. If it's an array
// or other simple type it will return immediately, but it's safe
// to await its values anyway.
export type Sequence<T> = Iterable<T> | AsyncIterable<T>

export async function* linesFromFile(path: string) : Sequence<string> {
    for await (const line of readline.createInterface({input: fs.createReadStream(path)})) {
        yield line;
    }
}

export async function* map<From, To>(sequence: Sequence<From>, func: (x: From) => To) : Sequence<To> {
    for await (const x of sequence) {
        yield func(x);
    }
}

export async function sum(sequence: Sequence<number>) : Promise<number> {
    let total = 0;
    for await (const n of sequence) {
        total += n;
    }
    return total;
}






