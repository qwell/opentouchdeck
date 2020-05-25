import * as fs from 'fs';
import * as path from 'path';
import { ActionExecute, Page, ConfigData, ConfigJSON, ActionList, BaseAction, BaseActionData } from '@opentouchdeck/opentouchdeck';

import Main from './Main';

Main.start();

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

export { }
