import { ActionExecute, Board, ConfigData, ConfigJSON } from 'opentouchdeck';

import Main from './Main';

Main.start();

const AE = ActionExecute.fromJSON({"name": "Jason", "description": "a thing", "path": "/var/www/html"});
AE.execute();

const dataJSON = JSON.parse(`{
	"boards": [{"id": 7}]
}`);
var data : ConfigData = new ConfigData();

if (dataJSON.boards !== undefined) {
	dataJSON.boards.forEach(function(board : Board) {
		data.boards.push(Board.fromJSON(board));
	});
}

data.boards.push(Board.fromJSON({"id": 3}));
console.log(data);

var conf = new ConfigJSON(data);
conf.show();

export {}
