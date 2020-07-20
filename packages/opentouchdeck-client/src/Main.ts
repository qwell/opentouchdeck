import { app, BrowserWindow, ipcMain } from 'electron';
import * as WebSocket from 'ws';
import * as path from 'path';

const WS_URL = "ws://127.0.0.1:2501";

export default class Main {
	static mainWindow: BrowserWindow | null = null;
	static ws: WebSocket;

	static start() {
		app.whenReady().then(this.onReady);
		Main.ws = new WebSocket(WS_URL);
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
		Main.mainWindow.webContents.openDevTools();

		Main.mainWindow.on("closed", () => {
			Main.mainWindow = null;
		});

		ipcMain.on('otdws', (event, message) => {
			Main.ws.send(message);
		});

		Main.ws.on('message', (message: WebSocket.Data) => {
			Main.mainWindow?.webContents.send('otdws', message);
		});
	}
}