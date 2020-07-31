import BaseAction from './BaseAction';
import BaseActionData from './BaseActionData';
import ActionDataOBSWS from './ActionDataOBSWS';

import * as fs from 'fs';
import * as OBSWebSocket from 'obs-websocket-js';

export default class ActionOBSWS extends BaseAction {
    name = "OBS WebSocket";
    description = "Handle OBS scenes and sources";

    emittable = [
        "obs/???"
    ];

    OBS: OBSWebSocket;

    constructor() {
        super();

        /*
        if (fs.existsSync('tokens/twitch.json')) {
            config = JSON.parse(fs.readFileSync('tokens/twitch.json', 'utf-8'));
        } else {
            config = {};
        }
        */

        this.OBS = new OBSWebSocket();

        this.OBS.on('ConnectionOpened', () => {
            console.log("OBS-WS connection opened");

            this.OBS.sendCallback('GetSceneList', (err, data) => {
                console.log('Current Scene: ' + data?.["current-scene"]);

                data?.scenes.forEach(scene => {
                    console.log('Scene: ' + scene.name);
                    scene.sources.forEach(source => {
                        console.log('  Source: ' + source.name);
                    });
                });
            });
        });

        this.OBS.on('SwitchScenes', data => {
            console.log('Changed Scene: ' + data["scene-name"]);
        })

        //this.OBS.connect({ address: (params.address ? params.address : 'localhost') + ':' + (params.port ? params.port : '4444'), password: params.password ? params.password : '' });
    }

    createActionData(data: any = {}): BaseActionData {
        return new ActionDataOBSWS(data);
    }

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        switch (event) {
            case "obs/???":
                return true;
        }

        return false;
    }
}
export { ActionDataOBSWS };