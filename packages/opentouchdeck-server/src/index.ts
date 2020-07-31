import ActionCounter from './Actions/ActionCounter';
import ActionExecute from './Actions/ActionExecute';
import ActionList from './Actions/ActionList';
import ActionOBSWS from './Actions/ActionOBSWS';
import ActionRandom from './Actions/ActionRandom';
import ActionTwitch from './Actions/ActionTwitch';
import ActionURL from './Actions/ActionURL';
import BaseAction from './Actions/BaseAction';
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
import * as WebSocket from 'ws';

const DEFAULT_PORT = 2501;

/*
 * List of built-in actions to register
const actions: typeof BaseAction[] = [
    ActionCounter,
    ActionExecute,
    ActionOBSWS,
    ActionRandom,
    ActionTwitch,
    ActionURL,
];

actions.forEach(action => ActionList.registerAction(new action()));
 */

/*
 * Load and test list of actions.
 */
/*
const actionsContents = fs.readFileSync(path.join(__dirname, '../testactions.json'), 'utf8');
const actionData = JSON.parse(actionsContents);
actionData.forEach(function (data: any = {}) {
    const action: BaseAction | undefined = ActionList.getAction(data.action);
    if (action) {
        console.log(action)
        const AD: BaseActionData = action.createActionData(data);
        AD.execute();
    } else {
        console.log("Action type '" + data.action + "' could not be found.");
    }
});
*/

EventHandlers.triggers.on('plugin/registered', name => {
    const newplugin: Plugin = <Plugin>PluginHandler.getPlugin(name);
    newplugin.execute();
});

EventHandlers.triggers.on('plugin/configupdated', name => {
    console.log("Plugin Config Updated: " + name);
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

// TODO Finish me
// Add triggers from configuration to global event handlers
var pages = apiotd.pages.getPages();
pages.forEach((page: string) => {
    var buttons = apiotd.buttons.getButtons(page);
    buttons.forEach(button => {
        var b = apiotd.buttons.getButton(page, button);
        b?.triggers.forEach((trigger: ButtonTrigger) => {
            EventHandlers.triggers.on(trigger.event, (data) => {
                switch (trigger.event) {
                    case "twitch/chat":
                        var action = ActionList.getAction("Twitch");
                        if (action?.eventDataMatch(trigger.event, trigger.data, data)) {
                            WSService.wss.clients.forEach(ws => {
                                var wsOutput = {
                                    "page": page,
                                    "button": button,
                                    "faicon": trigger.UI.faicon
                                };
                                ws.send(new WSMessage("pageButtonIconUpdate", wsOutput).toString());
                            })
                        }
                        break;
                }
            });
        })
    })
});

EventHandlers.triggers.on("twitch/chat", (data) => {
    console.log(data);

    if (data.channel === '#northantara' && data.user === 'northantara' && data.message.startsWith('fa-')) {
        WSService.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                var button = WSService.apiotd.buttons.getButton("Page Two", 1);
                if (button) {
                    button.faicon = 'fab ' + data.message;

                    client.send(new WSMessage('pageButtonUpdate', {
                        page: "Page Two",
                        button: button
                    }).toString());
                }
            }
        });
    }
});

//let rService = new RESTService(DEFAULT_PORT, apiotd);
//rService.start();