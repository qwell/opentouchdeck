import BaseActionData from './BaseActionData';

export default class BaseAction {
    readonly name: string = "UNKNOWN";
    readonly description: string = "An unknown action.";

    readonly emittable: string[] = [];

    constructor(data: any = {}) {
    }

    createActionData(params: any = {}): BaseActionData {
        return new BaseActionData(params);
    }

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        return false;
    }
}

export { BaseActionData };