import BaseActionData from './BaseActionData';

export default class ActionDataURL extends BaseActionData {
    url: string = "";
    background: boolean = false;

    constructor(params: any = {}) {
        super(params);

        this.url = params.url;
        this.background = params.background;
    }

    protected executePre() {
        console.log("Pre: " + this.url + (this.background ? " (Background)" : ""));
    }

    protected executePost() {
        console.log("Post: " + this.url + (this.background ? " (Background)" : ""));
    }
}