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
    const newplugin: Plugin = <Plugin>PluginHandler.getPlugin(name);
    newplugin.execute();
});

EventHandlers.triggers.on('plugin/configupdated', name => {
    console.log("Plugin Config Updated: " + name);
});

EventHandlers.triggers.on('ui/buttonupdate', (page, button, UI) => {
    WSService.wss.clients.forEach(ws => {
        var wsOutput = {
            "page": page,
            "button": button,
            "faicon": UI.faicon
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
    var buttons = apiotd.buttons.getButtons(page);
    buttons.forEach(button => {
        const b = apiotd.buttons.getButton(page, button);
        if (b === undefined) {
            return;
        }
        b.triggers.forEach((trigger: ButtonTrigger) => {
            EventHandlers.triggers.on(trigger.event, (data) => {
                var plugin = PluginHandler.getPlugin(b.action);
                if (plugin?.eventDataMatch(trigger.event, trigger.data, data)) {
                    EventHandlers.triggers.emit('ui/buttonupdate', page, button, trigger.UI);
                }
            });
        });
    });
});