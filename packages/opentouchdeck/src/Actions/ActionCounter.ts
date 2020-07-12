import BaseAction from './BaseAction';
import BaseActionData from './BaseActionData';
import ActionDataCounter from './ActionDataCounter';

export default class ActionCounter extends BaseAction {
    name = "Counter";
    description = "Stores a numeric counter.";

    constructor() {
        super();
    }

    createActionData(data: any = {}): BaseActionData {
        return new ActionDataCounter(data);
    }
}
export { ActionDataCounter };