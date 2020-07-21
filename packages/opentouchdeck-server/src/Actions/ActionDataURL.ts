import BaseActionData from './BaseActionData';

export default class ActionDataURL extends BaseActionData {
    url: string = "";
    background: boolean = false;

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);

        this.url = buttonInfo.url;
        this.background = buttonInfo.background;
    }

    protected executePre() {
        console.log("Pre: " + this.url + (this.background ? " (Background)" : ""));
    }

    protected executePost() {
        console.log("Post: " + this.url + (this.background ? " (Background)" : ""));
    }
}