export default class Action {
	private _name: string = "";
	private _description: string = "";

	protected constructor(name : string = "", description: string = "") {
		this._name = name;
		this._description = description;
	}

	protected static fromJSON(data : any = {}) : Action {
		var action = new Action(data.name, data.description);
		return action;
	}

	execute() {
		this.executePre();
		console.log(this.name);
		console.log(this.description);
		this.executePost();
	}

	protected executePre() {
	}

	protected executePost() {
	}

	get name() {
		return this._name;
	}

	get description() {
		return this._description;
	}
}
