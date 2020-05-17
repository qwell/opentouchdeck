import Action from './Action';

export default class ActionExecute extends Action {
	private _path: string;

	constructor(name: string, description: string, path: string) {
		super(name, description);
		this._path = path;
	}

	executePre() {
		console.log(this.path);
	}

	executePost() {
		console.log(this.path);
	}

	get path() {
		return this._path;
	}
}
