import { app, BrowserWindow } from "electron";

export default class Main {
	static mainWindow : BrowserWindow | null = null;

	static start() {
		app.on("ready", Main.onReady);
	}

	static onReady() {
		Main.mainWindow = new BrowserWindow({
			height: 800,
			width: 600,
			webPreferences: {
				nodeIntegration: true
			}
		});

		Main.mainWindow.setMenu(null);

		Main.mainWindow.loadFile('../html/index.html');
		//Main.mainWindow.webContents.openDevTools();

		Main.mainWindow.on("closed", () => {
			Main.mainWindow = null;
		});
	}
}
