import Button from '../Buttons/Button';

export default class Position {
	position : number;
	button : Button;

	private constructor(position : number, button : Button) {
		this.position = position;
		this.button = button;
	}

	static fromJSON(data : any = {}) : Position {
		let button : Button = Button.fromJSON(data.button);
		let position : Position = new Position(data.number, button);

		return position;
	}
}
