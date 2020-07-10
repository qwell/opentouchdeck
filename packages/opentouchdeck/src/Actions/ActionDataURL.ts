import BaseActionData from './BaseActionData';

export default class ActionDataURL extends BaseActionData {
    url: string = "";
    background: boolean = false;

    constructor(data: any = {}) {
        super(data);

        this.url = data.url;
        this.background = data.background;
    }

    protected executePre() {
        console.log("Pre: " + this.url + (this.background ? " (Background)" : ""));
    }

    protected executePost() {
        console.log("Post: " + this.url + (this.background ? " (Background)" : ""));
    }
}