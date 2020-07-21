import BaseActionData from './BaseActionData';
import Variables, { Variable } from '../Variables';

export default class ActionDataRandom extends BaseActionData {
    type: string;
    variable: string;

    choices: string[];

    sides: number;
    count: number;

    minimum: number;
    maximum: number;

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);

        this.type = buttonInfo.type;
        this.variable = buttonInfo.variable;

        this.choices = buttonInfo.choices;

        this.sides = buttonInfo.sides;
        this.count = buttonInfo.count;

        this.minimum = buttonInfo.minimum ? buttonInfo.minimum : (buttonInfo.min ? buttonInfo.min : 0);
        this.maximum = buttonInfo.maximum ? buttonInfo.maximum : (buttonInfo.max ? buttonInfo.max : 0);
    }

    private generateRandomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected executePre() {
        var previous: number = Variables.getVariable(this.variable);
        if (previous === undefined) {
            previous = 0;
        }

        console.log("Pre: " + previous);
    }

    protected executePost() {
        var result = null;
        switch (this.type) {
            case "list":
                // data.choices will be JSON arrays like
                // ["heads", tails"]
                // ["rock", "paper", "scissors"]
                if (this.choices === undefined || this.choices.length === 0) {
                    return null;
                }

                var random: number = this.generateRandomBetween(0, this.choices.length - 1);
                result = this.choices[random];
                break;
            case "dice":
                // data.count
                // data.sides
                var dice: number = 0;
                if (this.count !== undefined && this.sides !== undefined) {
                    for (var i: number = 0; i < this.count; i++) {
                        dice += this.generateRandomBetween(1, this.sides);
                    }
                }
                result = dice;
                break;
            case "range":
                result = this.generateRandomBetween(this.minimum, this.maximum);
                break;
        }
        Variables.setVariable(this.variable, result);

        console.log("Post: " + result);
    }
}