import { BaseActionData } from '..';

export default class ActionDataExecute extends BaseActionData {
    path: string = "";
    args: string[] = [];

    constructor(data: any = {}) {
        super(data);

        this.path = data.path;
        this.args = data.args;
    }

    protected executePre() {
        console.log("Pre: " + this.path + " " + this.args.join(' '));
    }

    protected executePost() {
        console.log("Post: " + this.path + " " + this.args.join(' '));
    }
}