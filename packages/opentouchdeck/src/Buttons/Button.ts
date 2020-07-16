import { ActionList, BaseAction, BaseActionData } from '..';

export default class Button {
	position: number;
	onState: any = undefined;
	actionData: BaseActionData | undefined;
	buttonInfo: any = {};

	private constructor(data: any = {}) {
		this.position = data.position;

		const action: BaseAction | undefined = ActionList.getAction(data.action.name);
		if (action) {
			this.actionData = action.createActionData(data.action);
		}
		this.buttonInfo = data.buttonInfo;
	}

	static fromJSON(data: any = {}): Button {
		let button: Button = new Button(data);

		return button;
	}
}
