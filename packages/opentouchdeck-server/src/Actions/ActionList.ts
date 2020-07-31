import BaseAction, { BaseActionData } from './BaseAction';

export default class ActionList {
    private static actions: BaseAction[] = [];
    private static actionDatas: BaseActionData[] = [];

    static registerAction(action: BaseAction) {
        if (!this.actions.some(registeredAction => action.name === registeredAction.name)) {
            this.actions.push(action);
        }
    }

    static unregisterAction(actionName: string) {
        this.actions = this.actions.filter(registeredAction => registeredAction.name === actionName);
    }

    static registerActionData(actionData: BaseActionData) {
        this.actionDatas.push(actionData);
    }

    static unregisterActionData(uuid: string) {
        this.actionDatas = this.actionDatas.filter(registeredActionData => registeredActionData.uuid === uuid);
    }

    static getActions(): BaseAction[] {
        return ActionList.actions;
    }

    static getAction(actionName: string): BaseAction | undefined {
        return ActionList.actions.find(action => action.name === actionName);
    }

    static getActionData(uuid: string): BaseActionData | undefined {
        return ActionList.actionDatas.find(actionData => actionData.uuid == uuid);
    }
}