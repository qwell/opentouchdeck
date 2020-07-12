import {
    ActionList,
    BaseAction,
    ActionCounter, ActionExecute, ActionURL,
    ConfigData, ConfigJSON,
    API
} from '@opentouchdeck/opentouchdeck';
import RESTService from './RESTService';

import * as path from 'path';

const DEFAULT_PORT = 2501;

/*
 * List of built-in actions to register
 */
const actions: typeof BaseAction[] = [
    ActionCounter,
    ActionExecute,
    ActionURL,
];

actions.forEach(action => ActionList.registerAction(new action()));

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

var apiotd = new API();
apiotd.config.loadConfig(path.join(__dirname, '../testconfig.json'));

var conf = new ConfigJSON(ConfigData);
conf.show();

let rService = new RESTService(DEFAULT_PORT, apiotd);
rService.start();