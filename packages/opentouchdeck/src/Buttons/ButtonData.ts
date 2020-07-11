import { ActionList, BaseAction, BaseActionData } from '..';

export default class ButtonData {
    onState: any = undefined;
    actionData: BaseActionData | undefined;
    buttonInfo: any = {};

    private constructor(data: any = {}) {
        //console.log(data);
        const action: BaseAction | undefined = ActionList.getAction(data.action.name);
        if (action) {
            this.actionData = action.createActionData(data.action);
        }
        this.buttonInfo = data.buttonInfo;
    }

    static fromJSON(data: any = {}): ButtonData {
        return new ButtonData(data);
    }
}
