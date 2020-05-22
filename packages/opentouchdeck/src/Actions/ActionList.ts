import BaseAction from './BaseAction';

export default class ActionList {
	private static actions : ActionRegistration[] = [];

	static registerAction(actionName : string, action : BaseAction) {
		if (!this.actions.some(actionRegistration => name === actionRegistration.name)) {
			this.actions.push(new ActionRegistration(name, action));
		}
	}

	static unregisterAction(actionName : string) {
		this.actions = this.actions.filter(actionRegistration => actionRegistration.name === actionName);
	}
}

class ActionRegistration {
	name : string;
	action : BaseAction;

	constructor(name : string, action : BaseAction) {
		this.name = name;
		this.action = action;
	}
}
