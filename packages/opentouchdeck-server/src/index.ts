import { ActionList, ActionExecute, BaseAction, BaseActionData } from '@opentouchdeck/opentouchdeck';
import { ConfigData, ConfigJSON, Page } from '@opentouchdeck/opentouchdeck';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_PORT = 2501;

let actions: any[] = [
    ActionExecute
];

actions.forEach(action => ActionList.registerAction(new action()));

const action: BaseAction | undefined = ActionList.getAction("Execute");
console.log("abc", action, "def");
if (action) {
    const AE: BaseActionData = action.createActionData({ "path": "/var/www/html" });
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

let apiotd = express();
let server = apiotd.listen(DEFAULT_PORT);

apiotd.get('/actions', async (req: any, res) => {
    res.send(ActionList.getActions());
});

apiotd.get('/actions/:actionName', async (req: any, res) => {
    res.send(ActionList.getAction(req.params.actionName));
});