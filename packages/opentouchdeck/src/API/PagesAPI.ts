import Page from '../Pages/Page';
import ConfigData from '../Configs/ConfigData';

export default class PagesAPI {
    getPages(): string[] {
        return ConfigData.getPages();
    }
    getPage(pageName: string): Page | undefined {
        const page: Page | undefined = ConfigData.getPage(pageName);
        return page;
    }
}