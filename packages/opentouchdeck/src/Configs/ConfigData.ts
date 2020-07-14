import Page from '../Pages/Page';

export default class ConfigData {
    private static pages: Page[] = [];

    static addPage(page: Page) {
        this.pages.push(page)
    }

    static getPage(pageTitle: string): Page | undefined {
        return ConfigData.pages.find(page => page.title === pageTitle);
    }

    static getPages(): string[] {
        var pageList: string[] = [];
        this.pages.forEach(page => { pageList.push(page.title) });

        return pageList;
    }

    static clear() {
        this.pages = [];
    }
}
