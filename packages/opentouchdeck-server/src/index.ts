import ActionCounter from './Actions/ActionCounter';
import ActionExecute from './Actions/ActionExecute';
import ActionList from './Actions/ActionList';
import ActionRandom from './Actions/ActionRandom';
import ActionTwitch from './Actions/ActionTwitch';
import ActionURL from './Actions/ActionURL';
import BaseAction from './Actions/BaseAction';
import ConfigData from './Configs/ConfigData';
import ConfigJSON from './Configs/ConfigJSON';
import API from './API/API';

import RESTService from './RESTService';

import * as path from 'path';

const DEFAULT_PORT = 2501;

/*
 * List of built-in actions to register
 */
const actions: typeof BaseAction[] = [
    ActionCounter,
    ActionExecute,
    ActionRandom,
    ActionTwitch,
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
// TODO Store config filename in variable storage
apiotd.config.loadConfig(path.join(__dirname, '../testconfig.json'));

var conf = new ConfigJSON(ConfigData);
conf.show();

let rService = new RESTService(DEFAULT_PORT, apiotd);
rService.start();