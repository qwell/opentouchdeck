import BaseActionData from './BaseActionData';
import Variables, { Variable } from '../Variables';

export default class ActionDataRandom extends BaseActionData {
    constructor(data: any = {}) {
        super(data);
    }

    private generateRandomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected executePre(data: any = {}) {
        var previous: number = Variables.getVariable(data.variable);
        if (previous === undefined) {
            previous = 0;
        }

        console.log("Pre: " + previous);
    }

    protected executePost(data: any = {}) {
        var choice = null;
        switch (data.type) {
            case "list":
                // data.choices will be JSON arrays like
                // ["heads", tails"]
                // ["rock", "paper", "scissors"]
                if (data.choices === undefined || data.choices.length === 0) {
                    return null;
                }

                var random: number = this.generateRandomBetween(0, data.choices.length - 1);
                choice = data.choices[random];
                break;
            case "dice":
                // data.count
                // data.sides
                var dice: number = 0;
                if (data.count !== undefined && data.sides !== undefined) {
                    for (var i: number = 0; i < data.count; i++) {
                        dice += this.generateRandomBetween(1, data.sides);
                    }
                }
                choice = dice;
                break;
            case "range":
                // data.minimum | data.min
                // data.maximum | data.max
                if (data.minimum === undefined && data.min !== undefined) {
                    data.minimum = data.min;
                }
                if (data.maximum === undefined && data.max !== undefined) {
                    data.maximum = data.max;
                }
                choice = this.generateRandomBetween(data.minimum, data.maximum);
                break;
        }
        Variables.setVariable(data.variable, choice);

        console.log("Post: " + choice);
    }
}