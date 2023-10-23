import {singleLineFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export function sumAllNumbers(s: string) {
    let total = 0;
    for (const n of s.matchAll(/-?\d+/g))  {
        total += +n[0];
    }
    return total;
}


export function sumNumbersUsingRedRules(s: string) {

    function recurse(obj: any): number {

        if (typeof obj === "string") {
            return 0;
        }

        if(typeof obj === "number") {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.reduce((acc, val) => acc + recurse(val), 0);
        }

        if (typeof obj === 'object') {
            let total = 0;
            for (const val of Object.values(obj)) {
                if (val === "red") {
                    return 0;
                }
                total += recurse(val);
            }
            return total;
        }

        throw new Error(`Unexpected format: ${obj}`);
    }

    return recurse(JSON.parse(s));
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const str = singleLineFromFile("./src/data/day12.txt");
    console.log(sumAllNumbers(str));
    console.log(sumNumbersUsingRedRules(str));
}
