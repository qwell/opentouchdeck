import { BaseActionData } from '..';

export default class ActionDataCounter extends BaseActionData {
    // TODO Act on a global list of named variables with name === data.variable
    counter: number = 0;

    constructor(data: any = {}) {
        super(data);
    }

    protected executePre(data: any = {}) {
        console.log("Pre: " + this.counter);

        switch (data.type) {
            case "increment":
                this.counter += data.value;
                break;
            case "decrement":
                this.counter -= data.value;
                break;
            case "set":
                this.counter = data.value;
                break;

        }
    }

    protected executePost(data: any = {}) {
        console.log("Post: " + this.counter);
    }
}