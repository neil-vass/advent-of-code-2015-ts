
export function lookAndSay(input: string) {
    const groups = input.match(/((.)\2*)/g);
    if(!groups) return "";
    return groups.map(g => `${g.length}${g[0]}`).join("");
}

export function iterateLookAndSay(str: string, iterations: number) {
    for(let i=0; i<iterations; i++) {
        str = lookAndSay(str);
    }
    return str;
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const puzzleInput = "1321131112";
    console.log(iterateLookAndSay(puzzleInput, 50).length);
}
