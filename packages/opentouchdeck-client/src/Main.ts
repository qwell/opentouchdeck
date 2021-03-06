import { app, BrowserWindow, ipcMain } from 'electron';
import * as WebSocket from 'ws';
import * as path from 'path';

const WS_ADDR = "127.0.0.1";
const WS_PORT = "2501";
const WS_URL = "ws://" + WS_ADDR + ":" + WS_PORT;

export default class Main {
	static mainWindow: BrowserWindow | null = null;
	static ws: WebSocket;

	private static startWS() {
		Main.ws = new WebSocket(WS_URL);
		Main.ws.on('open', (ws: WebSocket) => {
			Main.onReady();
		})
	}

	static start() {
		app.whenReady().then(this.startWS);
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