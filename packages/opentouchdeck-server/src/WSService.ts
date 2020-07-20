import API from './API/API';

import * as WebSocket from 'ws';
export default class WSService {
    private port: number;
    private apiotd: API;

    constructor(port: number, apiotd: API = new API()) {
        this.port = port;
        this.apiotd = apiotd;
    }

    start() {
        let wss = new WebSocket.Server({ port: this.port });
        wss.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: WebSocket.Data) => {
                if (message.toString().length === 0) {
                    return;
                }
                const wsm: WSMessage | null = WSMessage.fromJSON(message);
                if (!wsm) {
                    return;
                }

                var responseData: any;

                // TODO Create a static class to hold all of the registered message types and send to the appropriate callback(s).
                switch (wsm.type) {
                    case "loadConfig":
                        responseData = this.apiotd.config.loadConfig(this.apiotd.variables.getVariable("MAINCONFIG"));
                        break;
                    case "reloadConfig":
                        responseData = this.apiotd.config.reloadConfig(this.apiotd.variables.getVariable("MAINCONFIG"));
                        break;
                    case "getActions":
                        responseData = this.apiotd.actions.getActions();
                        break;
                    case "getAction":
                        responseData = this.apiotd.actions.getAction(wsm.data.name);
                        break;
                    case "getPages":
                        responseData = this.apiotd.pages.getPages();
                        break;
                    case "getPage":
                        responseData = this.apiotd.pages.getPage(wsm.data.page);
                        break;
                    case "getPageButtons":
                        responseData = {
                            page: wsm.data.page,
                            buttons: this.apiotd.buttons.getButtons(wsm.data.page)
                        };
                        break;
                    case "getPageButton":
                        responseData = {
                            page: wsm.data.page,
                            button: this.apiotd.buttons.getButton(wsm.data.page, Number(wsm.data.button))
                        };
                        break;
                    case "sendPageButtonEvent":
                        responseData = {
                            page: wsm.data.page,
                            button: wsm.data.button,
                            output: this.apiotd.buttons.buttonEvent(wsm.data.page, Number(wsm.data.button), wsm.data.params)
                        }
                        break;
                    case "getVariables":
                        responseData = this.apiotd.variables.getVariables();
                        break;
                    case "getVariable":
                        responseData = this.apiotd.variables.getVariable(wsm.data.name);
                        break;
                    case "setVariable":
                        responseData = this.apiotd.variables.setVariable(wsm.data.name, wsm.data.value !== undefined ? wsm.data.value : null);
                        break;
                    default:
                        return;
                }

                if (!wsm.type.startsWith("response_")) {
                    ws.send(new WSMessage("response_" + wsm.type, responseData).toString());
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