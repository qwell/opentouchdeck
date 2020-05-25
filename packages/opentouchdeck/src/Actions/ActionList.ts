import BaseAction from './BaseAction';

export default class ActionList {
    private static actions: BaseAction[] = [];

    static registerAction(action: BaseAction) {
        if (!this.actions.some(registeredAction => action.name === registeredAction.name)) {
            this.actions.push(action);
        }
    }

    static unregisterAction(actionName: string) {
        this.actions = this.actions.filter(registeredAction => registeredAction.name === actionName);
    }

    static getActions(): BaseAction[] {
        return ActionList.actions;
    }

    static getAction(actionName: string): BaseAction | undefined {
        return ActionList.actions.find(action => action.name === actionName);
    }
}