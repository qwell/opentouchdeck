import ActionList from '../Actions/ActionList';
import BaseAction from '../Actions/BaseAction';
import BaseActionData from '../Actions/BaseActionData';

import { v4 as uuidv4 } from 'uuid';

export default class Button {
	position: number;
	onState: any = undefined;
	actionDataUUID: string | null = null;
	/*
	actionData: BaseActionData | undefined;
	*/

	private constructor(data: any = {}) {
		this.position = data.position;

		const action: BaseAction | undefined = ActionList.getAction(data.action.name);
		if (action) {
			var actionData: BaseActionData | undefined;
			this.actionDataUUID = uuidv4();
			actionData = action.createActionData(data.buttonInfo);
			actionData.uuid = this.actionDataUUID;
			ActionList.registerActionData(actionData);
		}
	}

	static fromJSON(data: any = {}): Button {
		let button: Button = new Button(data);

		return button;
	}
}
