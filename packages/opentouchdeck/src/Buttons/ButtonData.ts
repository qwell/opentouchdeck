export default class ButtonData {
	onState : any = undefined;

	static fromJSON(data : any = {}) : ButtonData {
		return new ButtonData();
	}
}
