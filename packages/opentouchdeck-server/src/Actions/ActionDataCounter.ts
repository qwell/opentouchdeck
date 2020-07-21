import BaseActionData from './BaseActionData';
import Variables, { Variable } from '../Variables';

export default class ActionDataCounter extends BaseActionData {
    variable: string;
    type: string;
    value: number;

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);

        this.variable = buttonInfo.variable;
        this.type = buttonInfo.type;
        this.value = buttonInfo.value;
    }

    protected executePre() {
        var counter: number = Variables.getVariable(this.variable);
        if (counter === undefined) {
            counter = 0;
        }

        console.log("Pre: " + counter);
    }

    protected executePost() {
        var counter: number = Variables.getVariable(this.variable);
        if (counter === undefined) {
            counter = 0;
        }

        switch (this.type) {
            case "increment":
                counter += this.value;
                break;
            case "decrement":
                counter -= this.value;
                break;
            case "set":
                counter = this.value;
                break;

        }
        Variables.setVariable(this.variable, counter)

        console.log("Post: " + counter);
    }
}