export default class Action {
	name: string = "";
	description: string = "";

	constructor(name: string = "", description: string = "") {
		this.name = name;
		this.description = description;
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

/*
	get name() {
		return this.name;
	}

	get description() {
		return this.description;
	}
*/
}
