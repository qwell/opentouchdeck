import BaseAction from './BaseAction';
import ActionDataURL from './ActionDataURL';

export default class ActionURL extends BaseAction {
    name = "URL";
    description = "Opens the specified URL in your default web browser (or optionally in the background).";

    constructor() {
        super();
    }

    createActionData(data: any = {}): ActionDataURL {
        return new ActionDataURL(data);
    }
}
export { ActionDataURL };