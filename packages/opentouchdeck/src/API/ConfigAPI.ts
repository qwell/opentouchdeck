import { ConfigData, Page, Config } from '..';

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
    }
}