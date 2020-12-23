import Page from '../Pages/Page';
import EventHandlers from '../EventHandlers';

export default class ConfigData {
    private static pages: Page[] = [];
    private static plugins: any[] = [];

    static addPage(page: Page) {
        this.pages.push(page)
    }

    static getPage(pageTitle: string): Page | undefined {
        return this.pages.find(page => page.title === pageTitle);
    }

    static getPages(): string[] {
        var pageList: string[] = [];
        this.pages.forEach(page => { pageList.push(page.title) });

        return pageList;
    }

    static clearPages() {
        this.pages = [];
    }

    static setPluginConfig(name: string, config: any) {
        this.plugins = this.plugins.map(plugin => plugin.name === name)
        this.plugins.push(config);

        EventHandlers.triggers.emit('plugin/configupdated', name);
    }

    static getPluginConfig(name: string): any {
        return this.plugins.find(plugin => plugin.name === name);
    }

    static clearPluginConfig() {
        this.plugins = [];

        EventHandlers.triggers.emit('plugin/configclear');
    }
}
