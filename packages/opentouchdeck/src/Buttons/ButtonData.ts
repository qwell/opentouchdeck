import { ActionList, BaseAction, BaseActionData } from '..';

export default class ButtonData {
    onState: any = undefined;
    actionData: BaseActionData | undefined;

    private constructor(data: any = {}) {
        const action: BaseAction | undefined = ActionList.getAction(data.action);
        if (action) {
            console.log(action)
            this.actionData = action.createActionData(data);
        }
    }

    static fromJSON(data: any = {}): ButtonData {
        return new ButtonData(data);
    }
}
