import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";

export function hasStraightOf3(password: string) {
    for (let i=0; i< password.length-2; i++) {
        const first = password.charCodeAt(i);
        const second = password.charCodeAt(i+1);
        const third = password.charCodeAt(i+2);
        if (first === second-1 && second === third-1) {
                return true;
        }
    }
    return false;
}

export function hasNoForbiddenLetters(password: string) {
    return password.match(/[iol]/) === null;
}

export function hasTwoDifferentPairs(password: string) {
    return password.match(/(.)\1.*(.(?!\1))\2/) !== null;
}

export function isValidPassword(password: string) {
    return hasStraightOf3(password) &&
        hasNoForbiddenLetters(password) &&
        hasTwoDifferentPairs(password);
}

export function incrementPassword(password: string) {
    let pos = password.length -1;
    while(password[pos] === 'z') {
        pos--;
        if (pos < 0) throw new Error("Ran out of possible passwords");
    }

    const replacement = String.fromCharCode(password.charCodeAt(pos) +1);
    return password.slice(0, pos) + replacement + 'a'.repeat(password.length - 1 - pos);
}

export function nextValidPassword(password: string) {
    while(true) {
        password = incrementPassword(password);
        if (isValidPassword(password)) return password;
    }
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    console.log(nextValidPassword("hepxxyzz"));
}
