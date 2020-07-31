import BaseActionData from './BaseActionData';

export default class ActionDataExecute extends BaseActionData {
    path: string = "";
    args: string[] = [];

    constructor(params: any = {}) {
        super(params);

        this.path = params.path;
        this.args = params.args;
    }

    protected executePre() {
        console.log("Pre: " + this.path + " " + this.args.join(' '));
    }

    protected executePost() {
        console.log("Post: " + this.path + " " + this.args.join(' '));
    }
}