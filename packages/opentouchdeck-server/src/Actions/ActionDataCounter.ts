import { BaseActionData } from '..';
import Variables, { Variable } from '../Variables';

export default class ActionDataCounter extends BaseActionData {
    constructor(data: any = {}) {
        super(data);
    }

    protected executePre(data: any = {}) {
        var counter: number = Variables.getVariable(data.variable);
        if (counter === undefined) {
            counter = 0;
        }

        console.log("Pre: " + counter);
    }

    protected executePost(data: any = {}) {
        var counter: number = Variables.getVariable(data.variable);
        if (counter === undefined) {
            counter = 0;
        }

        switch (data.type) {
            case "increment":
                counter += data.value;
                break;
            case "decrement":
                counter -= data.value;
                break;
            case "set":
                counter = data.value;
                break;

        }
        Variables.setVariable(data.variable, counter)

        console.log("Post: " + counter);
    }
}