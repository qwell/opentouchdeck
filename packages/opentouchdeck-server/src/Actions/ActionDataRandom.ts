import BaseActionData from './BaseActionData';
import Variables, { Variable } from '../Variables';

export default class ActionDataRandom extends BaseActionData {
    constructor(buttonInfo: any = {}) {
        super(buttonInfo);
    }

    private generateRandomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected executePre() {
        var previous: number = Variables.getVariable(this.buttonInfo.variable);
        if (previous === undefined) {
            previous = 0;
        }

        console.log("Pre: " + previous);
    }

    protected executePost() {
        var choice = null;
        switch (this.buttonInfo.type) {
            case "list":
                // data.choices will be JSON arrays like
                // ["heads", tails"]
                // ["rock", "paper", "scissors"]
                if (this.buttonInfo.choices === undefined || this.buttonInfo.choices.length === 0) {
                    return null;
                }

                var random: number = this.generateRandomBetween(0, this.buttonInfo.choices.length - 1);
                choice = this.buttonInfo.choices[random];
                break;
            case "dice":
                // data.count
                // data.sides
                var dice: number = 0;
                if (this.buttonInfo.count !== undefined && this.buttonInfo.sides !== undefined) {
                    for (var i: number = 0; i < this.buttonInfo.count; i++) {
                        dice += this.generateRandomBetween(1, this.buttonInfo.sides);
                    }
                }
                choice = dice;
                break;
            case "range":
                // minimum | min
                // maximum | max
                if (this.buttonInfo.minimum === undefined && this.buttonInfo.min !== undefined) {
                    this.buttonInfo.minimum = this.buttonInfo.min;
                }
                if (this.buttonInfo.maximum === undefined && this.buttonInfo.max !== undefined) {
                    this.buttonInfo.maximum = this.buttonInfo.max;
                }
                choice = this.generateRandomBetween(this.buttonInfo.minimum, this.buttonInfo.maximum);
                break;
        }
        Variables.setVariable(this.buttonInfo.variable, choice);

        console.log("Post: " + choice);
    }
}