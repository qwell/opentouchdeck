import BaseAction from './BaseAction';
import ActionDataExecute from './ActionDataExecute';

export default class ActionExecute extends BaseAction {
    name = "Execute";
    description = "Executes a system script/executable.";

    constructor() {
        super();
    }

    createActionData(data: any = {}): ActionDataExecute {
        return new ActionDataExecute(data);
    }
}
export { ActionDataExecute };