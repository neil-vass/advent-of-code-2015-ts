import {expect, describe, it} from "vitest";
import * as day12 from "../src/day12";

describe("#sumAllNumbers", () => {
    it("Works for given part 1 examples", () => {
        expect(day12.sumAllNumbers(`[1,2,3]`)).toBe(6);
        expect(day12.sumAllNumbers(`{"a":2,"b":4}`)).toBe(6);

        expect(day12.sumAllNumbers(`[[[3]]]`)).toBe(3);
        expect(day12.sumAllNumbers(`{"a":{"b":4},"c":-1}`)).toBe(3);

        expect(day12.sumAllNumbers(`{"a":[-1,1]}`)).toBe(0);
        expect(day12.sumAllNumbers(`[-1,{"a":1}]`)).toBe(0);

        expect(day12.sumAllNumbers(`[]`)).toBe(0);
        expect(day12.sumAllNumbers(`{}`)).toBe(0);
    });

    it("Ignores any object that has property with value 'red'", () => {
        expect(day12.sumNumbersUsingRedRules(`[1,{"c":"red","b":2},3]`)).toBe(4);
        expect(day12.sumNumbersUsingRedRules(`{"d":"red","e":[1,2,3,4],"f":5}`)).toBe(0);
        expect(day12.sumNumbersUsingRedRules(`[1,"red",5]`)).toBe(6);
    });



});