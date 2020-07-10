import {
    ActionList, ActionExecute, ActionURL, BaseAction, BaseActionData,
    ConfigData, ConfigJSON, Page
} from '@opentouchdeck/opentouchdeck';
import * as fs from 'fs';
import * as path from 'path';
import RESTService from './RESTService';

const DEFAULT_PORT = 2501;

/*
 * List of built-in actions to register
 */
const actions: typeof BaseAction[] = [
    ActionExecute,
    ActionURL,
];

actions.forEach(action => ActionList.registerAction(new action()));

/*
 * Load and test list of actions.
 */
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

const configContents = fs.readFileSync(path.join(__dirname, '../testconfig.json'), 'utf8');
const dataJSON = JSON.parse(configContents);

if (dataJSON.pages !== undefined) {
    dataJSON.pages.forEach(function (page: Page) {
        ConfigData.addPage(Page.fromJSON(page));
    });
}

var conf = new ConfigJSON(ConfigData);
conf.show();

let rService = new RESTService(DEFAULT_PORT);
rService.start();