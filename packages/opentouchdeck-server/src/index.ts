import { ActionList, ActionExecute, BaseAction, BaseActionData } from '@opentouchdeck/opentouchdeck';
import { ConfigData, ConfigJSON, Page } from '@opentouchdeck/opentouchdeck';
import { API } from '@opentouchdeck/opentouchdeck';
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

let apiotd: API = new API();
let rAPI = express();
let server = rAPI.listen(DEFAULT_PORT);

rAPI.get('/actions', async (req: any, res) => {
    res.send(apiotd.actions.getActions());
});

rAPI.get('/actions/:name', async (req: any, res) => {
    res.send(apiotd.actions.getAction(req.params.name));
});

rAPI.post('/buttons/:button', async (req: any, res) => {
    res.send(apiotd.buttons.buttonEvent(req.params.button))
});