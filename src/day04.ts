import {md5} from "js-md5";

export function seedNumberFor(key: string, leadingZeroes: number = 5) {
    const target = "0".repeat(leadingZeroes);
    let seedNumber = 0;
    while(!md5(`${key}${seedNumber}`).startsWith(target)) {
        seedNumber++;
    }
    return seedNumber;
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const key = "iwrupvqb";
    console.log(seedNumberFor(key, 6));
}
