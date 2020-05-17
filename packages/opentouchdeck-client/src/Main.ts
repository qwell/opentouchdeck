import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

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
				preload: path.join(__dirname, 'preload.js'),
				nodeIntegration: false,
				contextIsolation: true
			}
		});

		Main.mainWindow.setMenu(null);

		Main.mainWindow.loadFile('../html/index.html');
		//Main.mainWindow.webContents.openDevTools();

		Main.mainWindow.on("closed", () => {
			Main.mainWindow = null;
		});

		ipcMain.on('test', (event, message) => {
			console.log("Received test.", message);
			event.reply('test', message);
		});
	}
}
