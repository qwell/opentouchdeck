export default class BaseActionData {
    constructor(data: any = {}) {

    }

    execute() {
        this.executePre();
        this.executePost();
    }

    protected executePre() {
    }

    protected executePost() {
    }
}