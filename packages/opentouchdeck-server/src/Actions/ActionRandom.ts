import BaseAction from './BaseAction';
import BaseActionData from './BaseActionData';
import ActionDataRandom from './ActionDataRandom';

export default class ActionRandom extends BaseAction {
    name = "Random";
    description = "Create a random value from a range.";

    constructor() {
        super();
    }

    createActionData(data: any = {}): BaseActionData {
        return new ActionDataRandom(data);
    }
}
export { ActionDataRandom };