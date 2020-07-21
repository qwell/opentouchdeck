export default class BaseActionData {
    uuid: string | null = null;
    buttonInfo: any = {};

    constructor(buttonInfo: any = {}) {
        this.buttonInfo = buttonInfo;
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