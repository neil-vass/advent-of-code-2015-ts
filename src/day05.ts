import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";


export function containsAtLeast3Vowels(str: string) {
    return (str.match(/[aeiou]/g) || []).length >= 3;
}

export function containsRepeatedLetter(str: string) {
    return str.match(/(.)\1/) !== null;
}

export function doesNotContainForbiddenPairs(str: string) {
    return str.match(/ab|cd|pq|xy/) === null;
}

export async function countNiceStrings(strings: Sequence<string>) {
    const niceStrings = strings.filter(containsAtLeast3Vowels)
                               .filter(containsRepeatedLetter)
                               .filter(doesNotContainForbiddenPairs);
    return Sequence.count(niceStrings);
}


export function aPairAppearsTwiceWithoutOverlapping(str: string) {
    return str.match(/(..).*\1/) !== null;
}

export function aLetterRepeatsWithOneLetterInBetween(str: string) {
    return str.match(/(.).\1/) !== null;
}

export async function countNiceStringsPart2(strings: Sequence<string>) {
    const niceStrings = strings.filter(aPairAppearsTwiceWithoutOverlapping)
                               .filter(aLetterRepeatsWithOneLetterInBetween);
    return Sequence.count(niceStrings);
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day05.txt";
    console.log(await countNiceStrings(linesFromFile(filepath)));
    console.log(await countNiceStringsPart2(linesFromFile(filepath)));
}
