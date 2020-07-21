$(document).ready(() => {
	window.ipcapi.send('otdws', new WSMessage("clientHello", {
		message: "Hi, I'm an electron opentouchdeck client.",
		version: "0.0.1"
	}).toString())
});

var buttonMap: any[] = [];

function otdwsSend(type: string, data?: any) {
	window.ipcapi.send('otdws', new WSMessage(type, data).toString())
}

window.ipcapi.onMessage('otdws', (event: string, msg: any) => {
	const wsm: WSMessage | null = WSMessage.fromJSON(msg);
	if (!wsm) {
		return;
	}

	var responseData: any;

	// TODO Create a static class to hold all of the registered message types and send to the appropriate callback(s).
	switch (wsm.type) {
		case "serverHello":
			console.log("Hello server " + wsm.data.message + " version " + wsm.data.version);
			break;
		case "pagesUpdate":
			console.log(wsm.data);
			wsm.data.forEach((page: string) => {
				buttonMap.push({ "page": page, "buttons": [] });
			});
			break;
		case "pageButtonsUpdate":
			wsm.data.buttons.forEach((button: number) => {
				var map = buttonMap.find(page => wsm.data.page === page.page);
				if (map !== undefined) {
					map.buttons.push({ "button": button });
				}
			});
			break;
		case "pageButtonUpdate":
			var map = buttonMap.find(item => wsm.data.page === item.page);
			if (map !== undefined) {
				map.buttons[wsm.data.button.position] = { info: wsm.data.button.buttonInfo, callback: "" };
				var onclick = "sendPageButtonEvent('" + wsm.data.page + "', '" + wsm.data.button.position + "')";
				$('.deck-page').append('<div class="deck-button" onclick="' + onclick + '"><span class="' + wsm.data.button.buttonInfo.icon + '"></span></div>');
			}
			break;
		case "response_sendPageButtonEvent":
			console.log(wsm.data);
			buttonMap.forEach((page: any) => {
				if (page.page === wsm.data.page) {
					page.buttons.forEach((button: any) => {
						if (button.button === wsm.data.button) {
							switch (button.callback) {
								case "0-0":
									otdwsSend('getVariable', {
										variableName: 'fooCounter'
									});
							}
						}
					})
				}
			});
			break;
		case "response_getVariable":
			$('.variable').val(wsm.data);
			break;
		case "response_setVariable":
			otdwsSend('getVariable', {
				variableName: 'bob'
			});
			break;
	}

	if (!wsm.type.startsWith("response_")) {
		otdwsSend("response_" + wsm.type, responseData);
	}
});

function sendPageButtonEvent(page: string, button: any) {
	var map = buttonMap.find(item => page === item.page);
	if (map !== undefined) {
		otdwsSend('sendPageButtonEvent', {
			"page": page,
			"button": button,
			"params": map.buttons[button]["info"]
		});
	}
}

class WSMessage {
	/*
	 * This class is copied straight from opentouchdeck-server.
	 * It should be updated as changes are made.
	 * 
	 * TODO That is not ideal.
	 */
	type: string;
	data: any;

	constructor(type: string, data: any) {
		this.type = type;
		this.data = data;
	}

	static fromJSON(message: any): WSMessage | null {
		if (message === null) {
			return null;
		}

		const json = JSON.parse(message);
		if (json.type === undefined) {
			return null;
		}

		const data = (json.data === undefined || json.data === null) ? {} : json.data;

		return new this(json.type, data);
	}

	toString() {
		return JSON.stringify(
			{
				type: this.type,
				data: this.data
			}
		);
	}
};