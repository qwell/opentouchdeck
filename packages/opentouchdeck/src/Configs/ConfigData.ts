import Page from '../Pages/Page';

export default class ConfigData {
    private static pages: Page[] = [];

    static addPage(page: Page) {
        this.pages.push(page)
    }

    static getPage(pageTitle: string): Page | undefined {
        return ConfigData.pages.find(page => page.title === pageTitle);
    }

    static getPages(): Page[] {
        return this.pages;
    }

    static clear() {
        this.pages = [];
    }
}
