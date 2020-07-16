window.onload = () => {
	/*
	window.ipcapi.send('setVariable', {
		variableName: 'bob',
		data: 'My fun variable value'
	}, "*");

	window.ipcapi.onMessage('setVariable', (event: string, message: any) => {
		if (message) {
			window.ipcapi.send('getVariable', {
				variableName: 'bob'
			}, "*");
		}
	});

	window.ipcapi.onMessage('getVariable', (event: string, message: any) => {
		console.log(event);
		console.log(message);

		console.log($('.variable'));
		$('.variable').val(message);
	});
	*/

	refreshPages();
};

function refreshPages() {
	window.ipcapi.send('getPages', {}, "*");
}

function refreshButtons(page: string) {
	window.ipcapi.send('getButtons', {
		"page": page
	});
}

function clickButton(page: string, button: number) {
	console.log("Button " + button + " on page " + page + " has been clicked.");
	sendButtonEvent(page, button);
}

const buttonMap: any[] = [];

window.ipcapi.onMessage('getPages', (event: string, message: any) => {
	message.forEach((page: string) => {
		buttonMap.push({ "page": page, "buttons": [] });

		refreshButtons(page);
	});
});

window.ipcapi.onMessage('getButtons', (event: string, message: any) => {
	message.buttons.forEach((button: number) => {
		var map = buttonMap.find(page => message.page === page.page);
		if (map !== undefined) {
			map.buttons.push({ "button": button });

			window.ipcapi.send('getButton', {
				"page": message.page,
				"button": button
			});
		}
	});
});

window.ipcapi.onMessage('getButton', (event: string, message: any) => {
	console.log(message);
	//console.log(buttonMap);
	var map = buttonMap.find(item => message.page === item.page);
	if (map !== undefined) {
		console.log('have map');
		console.log(map);
		map.buttons[message.button]["data"] = message.data;
		var onclick = "clickButton('" + message.page + "', '" + message.button + "')";
		$('.deck-page').append('<div class="deck-button" onclick="' + onclick + '"><span class="' + message.data.buttonInfo.icon + '"></span></div>');
	}
});

window.ipcapi.onMessage('sendButtonEvent', (event: string, message: any) => {
	buttonMap.forEach((page: any) => {
		if (page.page === message.input.page) {
			page.buttons.forEach((button: any) => {
				if (button.button === message.input.button) {
					switch (button.callback) {
						case "0-0":
							window.ipcapi.send('getVariable', {
								variableName: 'fooCounter'
							}, "*");
					}
				}
			})
		}
	});
});

window.ipcapi.onMessage('getVariable', (event: string, message: any) => {
	$('.variable').val(message);
});

function sendButtonEvent(page: string, button: any) {
	var map = buttonMap.find(item => page === item.page);
	if (map !== undefined) {
		window.ipcapi.send('sendButtonEvent', {
			"page": page,
			"button": button,
			"data": map.buttons[button]["data"]
		}, "*");
	}
}