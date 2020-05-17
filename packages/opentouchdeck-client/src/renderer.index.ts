window.onload = () => {
	window.ipcapi.onMessage('test', (event : string, message : any) => {
		console.log("API response", message);
	});

	window.ipcapi.send('test', {
		myData: '1234'
	}, "*");
};
