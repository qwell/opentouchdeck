import BaseActionData from './BaseActionData';

export default class ActionDataURL extends BaseActionData {
    /*
    url: string = "";
    background: boolean = false;
    */

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);
    }

    protected executePre() {
        console.log("Pre: " + this.buttonInfo.url + (this.buttonInfo.background ? " (Background)" : ""));
    }

    protected executePost() {
        console.log("Post: " + this.buttonInfo.url + (this.buttonInfo.background ? " (Background)" : ""));
    }
}