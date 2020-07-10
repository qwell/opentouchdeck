import {
    ActionList, ActionExecute, BaseAction, BaseActionData,
    ConfigData, ConfigJSON, Page
} from '@opentouchdeck/opentouchdeck';
import * as fs from 'fs';
import * as path from 'path';
import RESTService from './RESTService';

const DEFAULT_PORT = 2501;

const actions: typeof BaseAction[] = [
    ActionExecute,
];

actions.forEach(action => ActionList.registerAction(new action()));

const action: BaseAction | undefined = ActionList.getAction("Execute");
console.log(action);
if (action) {
    const AE: BaseActionData = action.createActionData({ "path": "/var/www/html", "args": ["arg1", "arg2"] });
    AE.execute();
}

const configContents = fs.readFileSync(path.join(__dirname, '../testconfig.json'), 'utf8');
const dataJSON = JSON.parse(configContents);

var data: ConfigData = new ConfigData();

if (dataJSON.pages !== undefined) {
    dataJSON.pages.forEach(function (page: Page) {
        data.pages.push(Page.fromJSON(page));
    });
}

var conf = new ConfigJSON(data);
conf.show();

let rService = new RESTService(DEFAULT_PORT);
rService.start();