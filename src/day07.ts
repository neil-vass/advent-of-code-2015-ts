import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export class Circuit {

    static andGate(leftSignal: number, rightSignal: number) { return leftSignal & rightSignal }
    static orGate(leftSignal: number, rightSignal: number) { return leftSignal | rightSignal }
    static lshift(signal: number, numBits: number) { return signal << numBits }
    static rshift(signal: number, numBits: number) { return (signal >> numBits) & 0xFFFF }

    static notGate(signal: number) { return ~signal & 0xFFFF }

    private components = new Map<string, string[]>();



    connect(command: string) {
        const setSignalMatch = command.match(/^(\w+) -> (\w+)$/);
        if (setSignalMatch) {
            const [signal, target] = setSignalMatch.slice(1);
            this.components.set(target, [signal]);
            return;
        }

        const unaryOpMatch = command.match(/^(NOT) (\w+) -> (\w+)$/);
        if (unaryOpMatch) {
            const [op, arg, target] = unaryOpMatch.slice(1);
            this.components.set(target, [op, arg]);
            return;
        }

        const binaryOpMatch = command.match(/^(\w+) (AND|OR|LSHIFT|RSHIFT) (\w+) -> (\w+)$/);
        if (binaryOpMatch) {
            const [left, op, right, target] = binaryOpMatch.slice(1);
            this.components.set(target, [op, left, right]);
            return;
        }

        throw new Error(`Can't understand command: "${command}"`);
    }

    async build(instructions: Iterable<string> | AsyncIterable<string>) {
        for await (const i of instructions)
            this.connect(i);
    }

    private getValue(str: string, cache: Map<string, number>) {
        if (str.match(/^\d+$/)) {
            return +str;
        } else {
            const result = this.calculateSignal(str, cache);
            cache.set(str, result);
            return result;
        }
    }

    private calculateSignal(target: string, cache=new Map<string, number>()) : number {
        if (cache.has(target)) {
            return cache.get(target)!;
        }

        if (!this.components.has(target)) {
            throw new Error(`Wire '${target}' doesn't have an input signal`);
        }

        const inputs = this.components.get(target)!;
        if (inputs.length === 1) {
            return this.getValue(inputs[0], cache);
        }

        if (inputs.length === 2) {
            const [opName, arg] = inputs;
            const op = Circuit.notGate;
            const argSignal = this.getValue(arg, cache);
            return op(argSignal);
        }

        if (inputs.length === 3) {
            const [opName, left, right] = inputs;
            const op = {
                "AND": Circuit.andGate,
                "OR": Circuit.orGate,
                "LSHIFT": Circuit.lshift,
                "RSHIFT": Circuit.rshift
            }[opName]!;

            const leftSignal = this.getValue(left, cache);
            const rightSignal = this.getValue(right, cache);
            return op(leftSignal, rightSignal);
        }
    }

    signalOn(wire: string)  {
        return this.calculateSignal(wire);
    }
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day07.txt";
    const circuit = new Circuit();
    await circuit.build(linesFromFile(filepath));
    console.log(circuit.signalOn('a'));
}

