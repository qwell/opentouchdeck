import Button from '../Buttons/Button';
import Page from '../Pages/Page';
import Position from '../Pages/Position';
import ConfigData from '../Configs/ConfigData';
import { BaseActionData } from '..';

export default class PagesAPI {
    getPages(): Page[] {
        return ConfigData.getPages();
    }
    getPage(pageName: string): Page | undefined {
        const page: Page | undefined = ConfigData.getPage(pageName);
        return page;
    }
}