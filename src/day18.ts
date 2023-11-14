import {linesFromFile} from "./helpers.js";

type Pos = [row: number, col: number];

class SetOfLights {

    private set = new Set<string>();

    add(elem: Pos) {
        this.set.add(JSON.stringify(elem));
        return this;
    }

    delete(elem: Pos) {
        return this.set.delete(JSON.stringify(elem));
    }

    *[Symbol.iterator]() : IterableIterator<Pos> {
        for (const elem of this.set) {
            yield JSON.parse(elem);
        }
    }

    get size() {
        return this.set.size;
    }
}

class NeighbourCounts {
     private map = new Map<string, number>();

     setIfMissing(key: Pos, initialValue: number) {
         const keyStr = JSON.stringify(key);
         if (!this.map.has(keyStr)) {
             this.map.set(keyStr, initialValue);
         }
     }

     addToCount(key: Pos, increment: number) {
         const keyStr = JSON.stringify(key);
         const oldVal = this.map.get(keyStr) || 0;
         this.map.set(keyStr, oldVal + increment);
     }

    *[Symbol.iterator]() : IterableIterator<[Pos, number]> { //Generator<[[number, number], number], void, undefined> {
        for (const [keyStr, val] of this.map) {
            yield [JSON.parse(keyStr), val];
        }
    }
}

export class Grid {

    private litLights = new SetOfLights();

    private _stickyCorners = false;

    private constructor(private readonly rows: number,
                        private readonly cols: number) {}

    private setOn(pos: Pos) {
        this.litLights.add(pos);
    }

    setStickyCorners() {
        this._stickyCorners = true;
        this.setOn([0, 0]);
        this.setOn([0, this.rows - 1]);
        this.setOn([this.cols - 1, 0]);
        this.setOn([this.cols - 1, this.rows - 1]);
    }

    *neighboursOf(row: number, col: number) : Iterable<[number, number]> {
        if (row > 0) {
            if (col > 0) yield [row - 1, col - 1];
            yield [row - 1, col];
            if (col < this.cols - 1) yield [row - 1, col + 1];
        }

        if (col > 0) yield [row, col - 1];
        if (col < this.cols - 1) yield [row, col + 1];

        if (row < this.rows - 1) {
            if (col > 0) yield [row + 1, col - 1];
            yield [row + 1, col];
            if (col < this.cols - 1) yield [row + 1, col + 1];
        }
    }

    step() {
        const neighbourCounts = new NeighbourCounts();

        for (const [row, col] of this.litLights) {
            neighbourCounts.setIfMissing([row, col], 0);

            for (const pos of this.neighboursOf(row, col)) {
                neighbourCounts.addToCount(pos, 1);
            }
        }

        for (const [pos, neighbours] of neighbourCounts) {
            if (neighbours !== 2) {
                this.litLights.delete(pos);
            }
            if (neighbours === 3) {
                this.litLights.add(pos);
            }
        }

        if (this._stickyCorners) {
            this.setStickyCorners();
        }
    }

    countLitLights() {
        return this.litLights.size;
    }

    static async create(rows: number, cols: number, description: Iterable<string> | AsyncIterable<string>) {
        const grid  = new Grid(rows, cols);
        let rowNum = 0;
        for await (const row of description) {
            for (let colNum=0; colNum < row.length; colNum++) {
                if (row[colNum] === '#') {
                    grid.setOn([rowNum, colNum]);
                }
            }
            rowNum++;
        }
        return grid;
    }
}
export async function run(filepath: string) {
    const grid = await Grid.create(100, 100, linesFromFile(filepath));
    grid.setStickyCorners(); // Needed for part 2; delete this line to solve part 1.
    for (let i=0; i<100; i++) {
        grid.step();
    }
    return grid.countLitLights();
}

// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day18.txt";
    console.log(await run(filepath));
}
