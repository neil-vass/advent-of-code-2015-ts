import readline from "node:readline/promises";
import fs from "fs";
import {Sequence} from "./sequence.js";

export function singleLineFromFile(path: string) {
    return fs.readFileSync(path, "utf8").trimEnd();
}

export function linesFromFile(path: string) : Sequence<string> {
    async function* readFile() {
        for await (const line of readline.createInterface({input: fs.createReadStream(path)})) {
            yield line;
        }
    }
    return new Sequence(readFile());
}

export function permutations<T>(arr: T[]): Sequence<T[]> {

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
                    [arr[i], arr[k - 1]] = [arr[k - 1], arr[i]];
                } else {
                    [arr[0], arr[k - 1]] = [arr[k - 1], arr[0]];
                }
            }
        }
    }

    return new Sequence(generatePermutations(arr));
}


export class SlowMinPriorityQueue {
    private arr = new Array<[string, number]>();

    push(elem: string, priority: number) {
        this.arr.push([elem, priority]);
    }

    pullMinElement() {
        let minPrioritySoFar = Infinity;
        let bestElem: string | null = null;
        let idxOfBestElem: number | null = null;

        for(const [idx, [elem, priority]] of this.arr.entries()) {
            if (priority < minPrioritySoFar) {
                minPrioritySoFar = priority;
                bestElem = elem;
                idxOfBestElem = idx;
            }
        }
        if (idxOfBestElem !== null) {
            this.arr.splice(idxOfBestElem, 1);
        }
        return bestElem;
    }
}

export class MinPriorityQueue {
    private heap = new Array<[string, number]>();

    push(elem: string, priority: number) {
        this.heap.push([elem, priority]);
        this.bubbleUp();
    }

    pullMinElement() {
        if (this.heap.length === 0) return null;
        this.swap(0, this.heap.length -1);
        const [elem, ] = this.heap.pop()!;
        this.bubbleDown();
        return elem;
    }

    private isHigherPriority(idx1: number, idx2: number) {
        return this.heap[idx1][1] > this.heap[idx2][1];
    }

    private swap(idx1: number, idx2: number) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    private bubbleUp() {
        let currentIndex = this.heap.length -1;
        let parentIndex = Math.ceil((currentIndex/2) -1);

        while (parentIndex >= 0 && this.isHigherPriority(parentIndex, currentIndex)) {
            this.swap(parentIndex, currentIndex);
            currentIndex = parentIndex;
            parentIndex = Math.ceil((currentIndex/2) -1);
        }
    }

    private lowestPriorityChild(idx: number) {
        const leftChildIndex = (2*idx) +1;
        const rightChildIndex = leftChildIndex +1;

        if (leftChildIndex >= this.heap.length) return null;
        if (rightChildIndex >= this.heap.length) return leftChildIndex;

        return this.isHigherPriority(leftChildIndex, rightChildIndex) ? rightChildIndex : leftChildIndex;
    }

    private bubbleDown() {
        let currentIndex = 0;
        let child = this.lowestPriorityChild(currentIndex);

        while (child !== null && this.isHigherPriority(currentIndex, child)) {
            this.swap(currentIndex, child);
            currentIndex = child;
            child = this.lowestPriorityChild(currentIndex);
        }
    }
}