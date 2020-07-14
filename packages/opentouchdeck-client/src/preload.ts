import { contextBridge, ipcRenderer } from 'electron';

declare global {
	interface Window {
		ipcapi: any
	}
}

process.once('loaded', () => {
	let listener;

	contextBridge.exposeInMainWorld('ipcapi', {
		send: (event: string, message: any[]) => {
			ipcRenderer.send(event, message);
		},
		onMessage: (event: string, callback: any) => {
			ipcRenderer.on(event, (event, message) => {
				callback(event, message);
			});
		}
	});
});
