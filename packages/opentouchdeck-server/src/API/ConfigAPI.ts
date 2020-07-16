import Config from '../Configs/Config';
import ConfigData from '../Configs/ConfigData';
import Page from '../Pages/Page';

import * as fs from 'fs';

export default class ConfigAPI {
    loadConfig(filepath: string) {
        const configContents = fs.readFileSync(filepath, 'utf8');
        const dataJSON = JSON.parse(configContents);

        if (dataJSON.pages !== undefined) {
            dataJSON.pages.forEach(function (page: Page) {
                ConfigData.addPage(Page.fromJSON(page));
            });
        }
    }

    reloadConfig(filepath: string) {
        ConfigData.clear();
        this.loadConfig(filepath);
        console.log("Reloaded config.");
    }
}