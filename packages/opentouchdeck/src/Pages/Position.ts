import Button from '../Buttons/Button';

export default class Position {
	// TODO Simplify this.  I'm pretty sure Position ~= Button
	index : number;
	button : Button;

	private constructor(position : number, button : Button) {
		this.index = position;
		this.button = button;
	}

	static fromJSON(data : any = {}) : Position {
		let button : Button = Button.fromJSON(data.button);
		let position : Position = new Position(data.position, button);

		return position;
	}
}
