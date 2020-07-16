import BaseAction from './BaseAction';
import BaseActionData from './BaseActionData';
import ActionDataTwitch from './ActionDataTwitch';

export default class ActionTwitch extends BaseAction {
    name = "Twitch";
    description = "Do Twitch stuff.  I don't know";

    constructor() {
        super();
    }

    createActionData(data: any = {}): BaseActionData {
        return new ActionDataTwitch(data);
    }
}
export { ActionDataTwitch };