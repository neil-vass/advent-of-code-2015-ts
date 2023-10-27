import {linesFromFile} from "./helpers.js";
import {Sequence} from "./sequence.js";


export interface CookieProperties {
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
}

export interface IngredientProperties extends CookieProperties {
    name: string;
    calories: number;
}


export class Cookie {
    private constructor(readonly properties: CookieProperties) {}

    private static builder = class Builder {
        private recipe = new Map<IngredientProperties, number>();

        with(teaspoons: number, ingredient: IngredientProperties): Builder {
            this.recipe.set(ingredient, teaspoons);
            return this;
        }

        and = this.with;

        bake() {
            const properties: CookieProperties = {capacity: 0, durability: 0, flavor: 0, texture: 0};

            for (const [ingredient, teaspoons] of this.recipe.entries()) {
                for (const prop in properties) {
                    // @ts-ignore: TS is worried we might have prop names not in the types here, I'm confident.
                    // IngredientProperties extends CookieProperties.
                    // If you use string literals, TS is fine - but it doesn't trust this 'prop' variable.
                    properties[prop] += ingredient[prop] * teaspoons;
                }
            }

            for (const prop in properties) {
                // @ts-ignore: Same as above.
                if (properties[prop] < 0) properties[prop] = 0;
            }

            return new Cookie(properties);
        }
    }

    static mix(teaspoons?: number, ingredient?: IngredientProperties) {
        const mixer = new Cookie.builder();
        if (arguments.length == 2) {
            mixer.with(arguments[0], arguments[1]);
        }
        return mixer;
    }



    static async bestCookieScoreFrom(totalTeaspoons: number, ingredients: IngredientProperties[]) {
        let best = 0;

        for await (const tsp of waysToAllocate(totalTeaspoons, ingredients.length)) {
            const mix = Cookie.mix();

            let calories = 0;
            ingredients.forEach((val, idx) => {
                mix.with(tsp[idx], val);
                calories += tsp[idx] * val.calories;
            });

            if (calories === 500) {
                const cookie = mix.bake();
                // @ts-ignore: TS doesn't trust that this object will have these keys. It should!
                const score = Object.keys(cookie.properties).reduce((acc, key) => acc * cookie.properties[key], 1);
                best = Math.max(best, score);
            }
        }

        return best;
    }
}

function waysToAllocate(balls: number, buckets: number) {

    function *choose(balls: number, buckets: number) : Iterable<number[]> {
        if (buckets === 1) {
            yield [balls]
        } else {
            for (let i=0; i<=balls; i++) {
                for (const response of choose(balls-i, buckets-1)) {
                    yield [i].concat(response)
                }
            }
        }
    }

    return new Sequence(choose(balls, buckets));
}

export function ingredientFromDescription(description: string): IngredientProperties {
    const m = description.match(
        /^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/
    );
    if (!m) throw new Error(`Unexpected line format: ${description}`);
    return {name: m[1], capacity: +m[2], durability: +m[3], flavor: +m[4], texture: +m[5], calories: +m[6]};
}

export async function bestCookieScore(lines: Sequence<string>) {
    const ingredients = await lines.map(ln => ingredientFromDescription(ln)).toArray();
    return Cookie.bestCookieScoreFrom(100, ingredients);
}


// If this script was invoked directly on the command line:
if (`file://${process.argv[1]}` === import.meta.url) {
    const filepath = "./src/data/day15.txt";

}
