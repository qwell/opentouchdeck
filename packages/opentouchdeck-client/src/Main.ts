import { app, BrowserWindow, ipcMain } from 'electron';
import * as superagent from 'superagent';
import * as path from 'path';

const BASE_URL = "http://192.168.68.42:2501";

export default class Main {
	static mainWindow: BrowserWindow | null = null;

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
		Main.mainWindow.webContents.openDevTools();

		Main.mainWindow.on("closed", () => {
			Main.mainWindow = null;
		});

		ipcMain.on('setVariable', (event, message) => {
			superagent.post(BASE_URL + '/variable/' + message.variableName).send({ "value": message.data }).end((err, res) => {
				console.log("POST " + err);
				console.log("POST " + res.body);
				event.reply('setVariable', res.body);
			});
		});

		ipcMain.on('getVariable', (event, message) => {
			superagent.get(BASE_URL + '/variable/' + message.variableName).end((err, res) => {
				console.log("GET " + err);
				console.log("GET " + (res.body.value !== undefined ? res.body.value : null));
				event.reply('getVariable', (res.body.value !== undefined ? res.body.value : null));
			})
		});

		ipcMain.on('getPages', (event, message) => {
			superagent.get(BASE_URL + '/pages').end((err, res) => {
				event.reply('getPages', (res.body !== undefined ? res.body : null));
			})
		});

		ipcMain.on('getButtons', (event, message) => {
			superagent.get(BASE_URL + '/page/' + message.page + '/buttons').end((err, res) => {
				event.reply('getButtons', {
					"page": message.page,
					"buttons": res.body !== undefined ? res.body : []
				});
			})
		});

		ipcMain.on('getButton', (event, message) => {
			superagent.get(BASE_URL + '/page/' + message.page + '/button/' + message.button).end((err, res) => {
				event.reply('getButton', {
					"page": message.page,
					"button": message.button,
					"data": res.body !== undefined ? res.body : null
				}
				)
			})
		});

		ipcMain.on('sendButtonEvent', (event, message) => {
			superagent.post(BASE_URL + '/page/' + message.page + '/button/' + message.button + '/event').send(message.data).end((err, res) => {
				//console.log("POST " + err);
				//console.log("POST " + res.body);
				event.reply('sendButtonEvent', { "input": { "page": message.page, "button": message.button }, "output": res.body });
			});
		});
	}
}
