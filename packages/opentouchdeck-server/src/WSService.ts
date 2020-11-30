import API from './API/API';

import * as WebSocket from 'ws';

export default class WSService {
    private static port: number;
    static apiotd: API;

    static wss: WebSocket.Server;

    static initialize(port: number, apiotd: API = new API()) {
        this.port = port;
        this.apiotd = apiotd;
    }

    static start() {
        this.wss = new WebSocket.Server({ port: this.port });
        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: WebSocket.Data) => {
                if (message.toString().length === 0) {
                    return;
                }
                const wsm: WSMessage | null = WSMessage.fromJSON(message);
                if (!wsm) {
                    return;
                }

                // TODO Create a static class to hold all of the registered message types and send to the appropriate callback(s).
                switch (wsm.type) {
                    case "clientHello":
                        console.log("Client connected: " + wsm.data.message + " - " + wsm.data.version);
                        ws.send(new WSMessage("serverHello", { message: "opentouchdeck-server", version: "0.0.1" }).toString());

                        var pages = this.apiotd.pages.getPages();
                        ws.send(new WSMessage("pagesUpdate", pages).toString());
                        pages.forEach(page => {
                            var positions = this.apiotd.buttons.getButtonPositions(page);

                            ws.send(new WSMessage("pageButtonPositionsUpdate", {
                                page: page,
                                positions: positions
                            }).toString());

                            positions.forEach(position =>
                                ws.send(new WSMessage("pageButtonUpdate", {
                                    page: page,
                                    button: this.apiotd.buttons.getButton(page, position)
                                }).toString())
                            )
                        })
                        break;
                    case "loadConfig":
                        this.apiotd.config.loadConfig(this.apiotd.variables.getVariable("MAINCONFIG"));
                        break;
                    case "reloadConfig":
                        this.apiotd.config.reloadConfig(this.apiotd.variables.getVariable("MAINCONFIG"));
                        break;
                    case "getPages":
                        this.apiotd.pages.getPages();
                        break;
                    case "getPage":
                        this.apiotd.pages.getPage(wsm.data.page);
                        break;
                    case "getPageButtonPositions":
                        this.apiotd.buttons.getButtonPositions(wsm.data.page)
                        break;
                    case "getPageButton":
                        this.apiotd.buttons.getButton(wsm.data.page, Number(wsm.data.button))
                        break;
                    case "sendPageButtonEvent":
                        console.log("Got click on page " + wsm.data.page + " button " + wsm.data.button + (wsm.data.params ? " params " + wsm.data.params : ""));
                        this.apiotd.buttons.buttonEvent(wsm.data.page, Number(wsm.data.button)/*, wsm.data.params*/);
                        break;
                    case "getVariables":
                        this.apiotd.variables.getVariables();
                        break;
                    case "getVariable":
                        this.apiotd.variables.getVariable(wsm.data.name);
                        break;
                    case "setVariable":
                        this.apiotd.variables.setVariable(wsm.data.name, wsm.data.value !== undefined ? wsm.data.value : null);
                        break;
                    default:
                        return;
                }
            })
        })
    }
}

export class WSMessage {
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