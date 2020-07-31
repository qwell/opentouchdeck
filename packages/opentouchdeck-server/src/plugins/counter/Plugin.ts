import Plugin from '../../Plugin';
import Variables, { Variable } from '../../Variables';

export default class PluginCounter extends Plugin {
    variable: string;
    type: string;
    value: number;

    constructor(params: any = {}) {
        super(params);

        this.variable = params.variable;
        this.type = params.type;
        this.value = params.value;
    }

    executePre() {
        var counter: number = Variables.getVariable(this.variable);
        if (counter === undefined) {
            counter = 0;
        }

        console.log("Pre: " + counter);
    }

    executePost() {
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

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        return true;
    }
}