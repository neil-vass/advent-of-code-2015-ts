
// A sequence is anything we can keep asking for more T's from.
// Might be an array (or anything using the Iterable interface),
// a generator, and it might be async (e.g. keep requesting the next
// line from a file or other IO-bound operation we want to await).
//
// Users of this type should assume it's async. If it's an array
// or other simple type it will return immediately, but it's safe
// to await its values anyway.
//
// This kind of support is likely to be part of the language soon!
// https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-async-iterator-helpers
// Until it's available, I've written this helper module.
export class Sequence<T> {
    constructor(protected readonly seq: Iterable<T> | AsyncIterable<T>) {}

    async *[Symbol.asyncIterator]() : AsyncGenerator<T, void, void> {
        for await(const x  of this.seq) {
            yield x;
        }
    }

    // Convenience method, to run through a whole sequence and collect it
    // into an array. Only use this if you know the sequence is finite and
    // its contents will fit into memory.
    async toArray() {
        let results: T[] = [];
        for await (const x of this.seq) {
            results.push(x);
        }
        return results;
    }

    filter(filterCondition: (x: T) => boolean) : Sequence<T> {
        async function* apply_filter(inputSeq: Iterable<T> | AsyncIterable<T>) {
            for await (const item of inputSeq) {
                if(filterCondition(item)) yield item;
            }
        }
        return new Sequence(apply_filter(this.seq));
    }

    map<TMap>(mappingFunction: (x: T) => TMap) : Sequence<TMap> {
        async function* apply_map(inputSeq: Iterable<T> | AsyncIterable<T>) {
            for await (const item of inputSeq) {
                yield mappingFunction(item);
            }
        }
        return new Sequence(apply_map(this.seq));
    }

    // On an infinite sequence, this will never return.
    static async sum(sequence: Sequence<number>) {
        let total = 0;
        for await (const n of sequence) {
            total += n;
        }
        return total;
    }

    // On an infinite sequence, this will never return.
    static async max(sequence: Sequence<number>) {
        let largestSeen = -Infinity;
        let foundEntry = false;

        for await (const n of sequence) {
            foundEntry = true;
            if (n > largestSeen) largestSeen = n;
        }

        if (!foundEntry) throw new Error("Can't find max of empty sequence");
        return largestSeen;
    }

    // On an infinite sequence, this will never return.
    static async maxObject(sequence: Sequence<any>, key: string) {
        let largestSeen: any;

        for await (const item of sequence) {
            const keyForItem = item[key]
            if (keyForItem === undefined) throw new Error("Key property missing from item");
            if (typeof keyForItem !== 'number') throw new Error("Key property must be a number");

            if (largestSeen === undefined) {
                largestSeen = item;
            } else {
                if (keyForItem > largestSeen[key]) largestSeen = item;
            }
        }

        if (largestSeen === undefined) throw new Error("Can't find max of empty sequence");
        return largestSeen;
    }

    // On an infinite sequence, this will never return.
    static async count(sequence: Sequence<any>) {
        return Sequence.sum(sequence.map(s => 1));
    }
}

