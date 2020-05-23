import { ActionExecute, Page, ConfigData, ConfigJSON } from 'opentouchdeck';

import Main from './Main';

Main.start();

const AE = ActionExecute.fromJSON({"name": "Jason", "description": "a thing", "path": "/var/www/html"});
AE.execute();

const dataJSON = JSON.parse(`
{
  "pages": [
    {
      "title": "TestPage",
      "positions": [
        {
          "position": 0,
          "button": {
            "": ""
          }
        }
      ]
    },
    {
      "title": "SecondPage"
    }
  ]
}
`);

var data : ConfigData = new ConfigData();

if (dataJSON.pages !== undefined) {
	dataJSON.pages.forEach(function(page : Page) {
		data.pages.push(Page.fromJSON(page));
	});
}

var conf = new ConfigJSON(data);
conf.show();

export {}
