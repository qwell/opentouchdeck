import BaseActionData from './BaseActionData';

export default class BaseAction {
    readonly name: string = "UNKNOWN";
    readonly description: string = "An unknown action.";

    constructor(data: any = {}) {
    }

    createActionData(buttonInfo: any = {}): BaseActionData {
        return new BaseActionData(buttonInfo);
    }
}

export { BaseActionData };