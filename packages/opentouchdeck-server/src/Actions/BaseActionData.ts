export default class BaseActionData {
    uuid: string | null = null;

    constructor(params: any = {}) {
    }

    execute(params: any = {}) {
        this.executePre(params);
        this.executePost(params);
    }

    protected executePre(params: any = {}) {
    }

    protected executePost(params: any = {}) {
    }
}