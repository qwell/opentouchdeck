$(document).ready(() => {
	window.ipcapi.send('otdws', new WSMessage("clientHello", {
		message: "Hi, I'm an electron opentouchdeck client.",
		version: "0.0.1"
	}).toString())
});

var pages: string[] = [];
var currentPage: string = "";
var buttons: any[] = [];

function otdwsSend(type: string, data?: any) {
	window.ipcapi.send('otdws', new WSMessage(type, data).toString())
}

window.ipcapi.onMessage('otdws', (event: string, msg: any) => {
	const wsm: WSMessage | null = WSMessage.fromJSON(msg);
	if (!wsm) {
		return;
	}

	switch (wsm.type) {
		case "serverHello":
			console.log("Hello server " + wsm.data.message + " version " + wsm.data.version);
			break;
		case "pagesUpdate":
			wsm.data.forEach((page: string) => {
				pages.push(page);
			});
			break;
		case "pageButtonPositionsUpdate":
			$('.deck-page').children().remove();
			buttons = [];
			currentPage = wsm.data.page;
			wsm.data.positions.forEach((position: { x: number, y: number }) => {
				buttons.push({ x: position.x, y: position.y });
			});
			break;
		case "pageButtonUpdate":
			buttons = buttons.filter(item => (wsm.data.button.x !== item.x || wsm.data.button.y !== item.y));
			buttons.push({ x: wsm.data.button.x, y: wsm.data.button.y /*, params: null*/ });

			var onclick = "sendButtonEvent(" + wsm.data.button.x + ", " + wsm.data.button.y + ")";
			var newDiv = $('<div data-x="' + wsm.data.button.x + '" data-y="' + wsm.data.button.y + '" class= "deck-button" onclick = "' + onclick + '" > </div>');
			newDiv[0].style.gridColumnStart = wsm.data.button.x + 1;
			newDiv[0].style.gridRowStart = wsm.data.button.y + 1;

			if (wsm.data.button.faicon !== undefined) {
				var faicon = $('<span class="faicon ' + wsm.data.button.faicon + '"></span>');
				newDiv.append(faicon);
			}

			$('.deck-page').append(newDiv);
			break;
		case "pageButtonUIUpdate":
			console.log(wsm.data);
			var button = $('.deck-page [data-x="' + wsm.data.button.x + '"][data-y="' + wsm.data.button.y + '"]');

			/* Remove all UI modifications. */
			button.find('span.faicon').remove();

			if (wsm.data.faicon !== undefined) {
				button.append('<span class="faicon ' + wsm.data.faicon + '"></span>');
			}
			break;
	}
});

function sendButtonEvent(x: any, y: any) {
	buttons.forEach(item => {
		if (item.x !== x || item.y !== y) {
			return;
		}
		console.log("Found it: " + x + ", " + y);
		otdwsSend('sendPageButtonEvent', {
			"page": currentPage,
			"x": x,
			"y": y/*,
			"params": item.params*/
		});
	});
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