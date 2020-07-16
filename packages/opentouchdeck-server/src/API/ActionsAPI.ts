import ActionList from "../Actions/ActionList";

export default class ActionsAPI {
    getActions() {
        return ActionList.getActions();
    }

    getAction(actionName: string) {
        return ActionList.getAction(actionName);
    }
}