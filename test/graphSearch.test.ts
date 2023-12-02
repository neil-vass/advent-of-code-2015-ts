import {expect, describe, it} from "vitest";
import {MinPriorityQueue} from "../src/graphSearch";


describe("A* search", () => {
    it("Uses a priority queue", () => {
        const queue = new MinPriorityQueue();
        queue.push("A", 5);
        queue.push("B", 10);
        queue.push("C", 2);

        expect(queue.pullMinElement()).toBe("C");

        queue.push("E", 6);
        queue.push("D", 12);

        expect(queue.pullMinElement()).toBe("A");
        expect(queue.pullMinElement()).toBe("E");
        expect(queue.pullMinElement()).toBe("B");
        expect(queue.pullMinElement()).toBe("D");
        expect(queue.pullMinElement()).toBeNull();

    });
});
