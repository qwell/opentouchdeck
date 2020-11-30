import ConfigData from './Configs/ConfigData';
import ConfigJSON from './Configs/ConfigJSON';
import EventHandlers from './EventHandlers';
import { ButtonTrigger } from './Buttons/Button';
import PluginHandler from './PluginHandler';
import Plugin from './Plugin';
import API from './API/API';
import WSService, { WSMessage } from './WSService';

import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_PORT = 2501;

EventHandlers.triggers.on('plugin/registered', name => {
    //const newplugin: Plugin = <Plugin>PluginHandler.getPlugin(name);
    console.log(name);
});

EventHandlers.triggers.on('plugin/configupdated', name => {
    console.log("Plugin Config Updated: " + name);
});

EventHandlers.triggers.on('ui/buttonupdate', event => {
    WSService.wss.clients.forEach(ws => {
        var wsOutput = {
            "page": event.page,
            "button": event.button,
            "faicon": event.UI.faicon
        };
        ws.send(new WSMessage("pageButtonUIUpdate", wsOutput).toString());
    });
});

var apiotd = new API();

const config: string = path.join(__dirname, '../config.json');
apiotd.variables.setVariable("MAINCONFIG", config);

// TODO Store config filename in variable storage
apiotd.config.loadConfig(config);

var confDisplay = new ConfigJSON(ConfigData);
confDisplay.show();

/* Iterate through plugins/ directory and register plugins using data from plugin.json */
const pluginsdir = path.join(__dirname, 'plugins');
fs.readdir(pluginsdir, (err, contents) => {
    contents.forEach((file, index) => {
        const plugindir = path.join(pluginsdir, file);

        fs.stat(plugindir, (err, stat) => {
            if (!stat.isDirectory()) {
                return;
            }

            Plugin.loadFromPath(plugindir).then((plugin: Plugin) => {
                PluginHandler.registerPlugin(plugin);
            }).catch((err: Error) => {
                console.log(err?.message);
            });
        });
    })
});

WSService.initialize(DEFAULT_PORT, apiotd);
WSService.start();

// Add triggers from configuration to global event handlers
var pages = apiotd.pages.getPages();
pages.forEach((page: string) => {
    var positions = apiotd.buttons.getButtonPositions(page);
    positions.forEach(position => {
        const button = apiotd.buttons.getButton(page, position);
        if (button === undefined) {
            return;
        }
        button.triggers.forEach((trigger: ButtonTrigger) => {
            EventHandlers.triggers.on(trigger.event, data => {
                /*
                 * This needs to not happen directly on a plugin function call.
                 * The button action (which should be expanded?) and button triggers are not related in any way.
                 */
                var plugin = PluginHandler.getPlugin(button.action);
                if (plugin?.eventDataMatch(trigger.event, trigger.match, data)) {
                    EventHandlers.triggers.emit('ui/buttonupdate', {
                        page: page,
                        button: position,
                        UI: trigger.UI
                    });
                }
            });
        });
    });
});