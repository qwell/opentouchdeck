import BaseActionData from './BaseActionData';

export default class ActionDataExecute extends BaseActionData {
    path: string = "";

    constructor(data: any = {}) {
        super(data);

        this.path = data.path;
    }

    protected executePre() {
        console.log("Pre: " + this.path);
    }

    protected executePost() {
        console.log("Post: " + this.path);
    }
}