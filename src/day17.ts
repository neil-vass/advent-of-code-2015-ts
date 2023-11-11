import {linesFromFile} from "./helpers.js";

export function waysToStore(amount: number, containers: number[]) {
    let ways: number[][] = [];
    for (let i=0; i<containers.length; i++) {
        if (containers[i] === amount) {
            ways.push([containers[i]]);
        } else if (containers[i] < amount) {
            const amountAfterFillingThisContainer = amount - containers[i];
            const laterContainers = containers.slice(i+1);

            const waysFromHere = waysToStore(amountAfterFillingThisContainer, laterContainers);
            waysFromHere.forEach(w => w.unshift(containers[i]));
            ways = ways.concat(waysFromHere);
        }
    }

    return ways;
}
export function numWaysToStore(amount: number, containers: number[]) {
    return waysToStore(amount, containers).length;
}

export function numWaysToStoreInMinimumContainers(amount: number, containers: number[]) {
    const ways = waysToStore(amount, containers);
    const minContainers = ways.reduce((acc, way) => (way.length < acc) ? way.length : acc, Infinity);
    const waysThatUseMinContainers = ways.filter(w => w.length === minContainers);
    return waysThatUseMinContainers.length;
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day17.txt";
    const containers = await linesFromFile(filepath).map(n => +n).toArray();
    console.log(`Part 1: ${numWaysToStore(150, containers)}`);
    console.log(`Part 2: ${numWaysToStoreInMinimumContainers(150, containers)}`);
}
