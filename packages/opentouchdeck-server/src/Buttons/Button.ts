import ActionList from '../Actions/ActionList';
import BaseAction from '../Actions/BaseAction';
import BaseActionData from '../Actions/BaseActionData';

import { v4 as uuidv4 } from 'uuid';

export default class Button {
	position: number;
	icon: string | undefined;
	onState: any = undefined;
	actionDataUUID: string | null = null;

	private constructor(data: any = {}) {
		this.position = data.position;
		this.icon = data.icon;

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
