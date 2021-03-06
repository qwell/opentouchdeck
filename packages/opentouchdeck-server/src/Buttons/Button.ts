export default class Button {
	x: number;
	y: number;
	icon: string | undefined;
	faicon: string | undefined;
	action: string;
	params: any[];
	triggers: ButtonTrigger[] = [];

	private constructor(data: any = {}) {
		this.x = data.x;
		this.y = data.y;
		this.icon = data.icon;
		this.faicon = data.faicon;

		this.action = data.action.name;
		this.params = data.action.params;

		data.triggers?.forEach((trigger: any) => {
			this.triggers.push(trigger);
		});
	}

	static fromJSON(data: any = {}): Button {
		let button: Button = new Button(data);

		return button;
	}
}

export class ButtonTrigger {
	event: string = "";
	match: any;
	UI: any;
}
