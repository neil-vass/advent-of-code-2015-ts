// Trying out n-readlines, which has nice short syntax
// BUT: I had to import it separately,
// and I haven't spotted any Typescript type declarations for it.
// Might change to something different!
import readlines from "n-readlines";

export function* fetchData(path: string) {
    const lines = new readlines(path);
    let ln: string;
    for (ln = lines.next()) {
        yield ln.toString().split('x').map(n => Number(n));
    }

}

export function requiredWrapping(length: number, width: number, height: number) {
    const sides = [length*width, width*height, height*length];
    const smallestSide = Math.min(...sides);
    return sides.reduce((acc, val) => acc + 2*val, smallestSide);
}

if (require.main === module) {
    const data: string = fetchData("data/day02.txt");
    console.log();
}
