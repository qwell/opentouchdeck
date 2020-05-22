import ButtonData from './ButtonData';

export default class Button {
	buttonData : ButtonData;

	private constructor(buttonData : ButtonData) {
		this.buttonData = buttonData;
	}

	static fromJSON(data : any = {}) : Button {
		let buttonData : ButtonData = ButtonData.fromJSON(data)
		let button : Button = new Button(buttonData);

		return button;
	}
}
