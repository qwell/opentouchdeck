import PluginHandler from '../../PluginHandler';
import Plugin from '../../Plugin';

import * as OBSWebSocket from 'obs-websocket-js';

export default class PluginOBSWS extends Plugin {
    OBS: OBSWebSocket;

    constructor(pluginData: any) {
        super(pluginData);

        // TODO Since we're typescript, we can check types, we just need to define them somewhere.
        PluginHandler.onEvent('volumeUpdate', (source: string, volume: number) => {
            /*
            this.OBS.currentScene.source[source].volume=volume;
            */
        });

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

        var config: any = this.config;

        this.OBS.connect({
            address: config.address + ':' + config.port,
            password: config.password
        });
    }

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        switch (event) {
            case "obs/???":
                return true;
        }

        return false;
    }

    executePre(params = {}) {
        console.log("Executed!");
    }

    executePost(params = {}) {
    }
}