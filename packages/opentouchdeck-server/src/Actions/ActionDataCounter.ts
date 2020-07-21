import BaseActionData from './BaseActionData';
import Variables, { Variable } from '../Variables';

export default class ActionDataCounter extends BaseActionData {
    constructor(buttonInfo: any = {}) {
        super(buttonInfo);
    }

    protected executePre() {
        var counter: number = Variables.getVariable(this.buttonInfo.variable);
        if (counter === undefined) {
            counter = 0;
        }

        console.log("Pre: " + counter);
    }

    protected executePost() {
        var counter: number = Variables.getVariable(this.buttonInfo.variable);
        if (counter === undefined) {
            counter = 0;
        }

        switch (this.buttonInfo.type) {
            case "increment":
                counter += this.buttonInfo.value;
                break;
            case "decrement":
                counter -= this.buttonInfo.value;
                break;
            case "set":
                counter = this.buttonInfo.value;
                break;

        }
        Variables.setVariable(this.buttonInfo.variable, counter)

        console.log("Post: " + counter);
    }
}