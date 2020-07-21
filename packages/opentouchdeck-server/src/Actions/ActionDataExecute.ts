import BaseActionData from './BaseActionData';

export default class ActionDataExecute extends BaseActionData {
    path: string = "";
    args: string[] = [];

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);

        this.path = buttonInfo.path;
        this.args = buttonInfo.args;
    }

    protected executePre() {
        console.log("Pre: " + this.path + " " + this.args.join(' '));
    }

    protected executePost() {
        console.log("Post: " + this.path + " " + this.args.join(' '));
    }
}