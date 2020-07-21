import BaseActionData from './BaseActionData';

export default class ActionDataExecute extends BaseActionData {
    /*
    path: string = "";
    args: string[] = [];
    */

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);
    }

    protected executePre() {
        console.log("Pre: " + this.buttonInfo.path + " " + this.buttonInfo.args.join(' '));
    }

    protected executePost() {
        console.log("Post: " + this.buttonInfo.path + " " + this.buttonInfo.args.join(' '));
    }
}