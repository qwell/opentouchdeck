import BaseAction from './BaseAction';

export default class ActionExecute extends BaseAction {
	private _path: string = "";

	constructor(name: string, description: string, path: string = "") {
		super(name, description);
		this._path = path;
	}

	static fromJSON(data : any = {}) : ActionExecute {
		var action = new ActionExecute(data.name, data.description, data.path);
		return action;
	}

	protected executePre() {
		console.log("Pre: " + this.path);
	}

	protected executePost() {
		console.log("Post: " + this.path);
	}

	get path() {
		return this._path;
	}
}
