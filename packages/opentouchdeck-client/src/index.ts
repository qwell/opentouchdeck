import * as fs from 'fs';
import * as path from 'path';
import { ActionExecute, Page, ConfigData, ConfigJSON } from 'opentouchdeck';

import Main from './Main';

Main.start();

const AE = ActionExecute.fromJSON({"name": "Jason", "description": "a thing", "path": "/var/www/html"});
AE.execute();

const configContents = fs.readFileSync(path.join(__dirname, '../testconfig.json'), 'utf8');
const dataJSON = JSON.parse(configContents);

var data : ConfigData = new ConfigData();

if (dataJSON.pages !== undefined) {
	dataJSON.pages.forEach(function(page : Page) {
		data.pages.push(Page.fromJSON(page));
	});
}

var conf = new ConfigJSON(data);
conf.show();

export {}
