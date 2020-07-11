export default class BaseActionData {
    constructor(data: any = {}) {

    }

    execute(data: any = {}, params: any = {}) {
        this.executePre(data, params);
        this.executePost(data, params);
    }

    protected executePre(data: any = {}, params: any = {}) {
    }

    protected executePost(data: any = {}, params: any = {}) {
    }
}