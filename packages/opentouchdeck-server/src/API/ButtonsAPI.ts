import Button from '../Buttons/Button';
import ConfigData from '../Configs/ConfigData';
import Page from '../Pages/Page';
import PluginHandler from '../PluginHandler';
import Plugin from '../Plugin';

export default class ButtonsAPI {
    getButtonPositions(pageName: string): { x: number, y: number }[] {
        var buttonList: { x: number, y: number }[] = [];
        const page: Page | undefined = ConfigData.getPage(pageName);
        if (page !== undefined) {
            page.buttons.forEach(button => buttonList.push({ x: button.x, y: button.y }));
        }
        return buttonList;
    }

    getButton(pageName: string, buttonX: number, buttonY: number) {
        const page: Page | undefined = ConfigData.getPage(pageName);
        if (page) {
            const button: Button | undefined = page.buttons.find(item => (item.x === buttonX && item.y === buttonY));
            if (button != undefined) {
                return {
                    x: button.x,
                    y: button.y,
                    icon: button.icon,
                    faicon: button.faicon,
                    triggers: button.triggers,
                    action: button.action,
                    params: button.params
                }
            }
            return undefined;
        }
    }

    buttonEvent(pageName: string, buttonX: number, buttonY: number/*, buttonParams?: any*/): any {
        const page: Page | undefined = ConfigData.getPage(pageName);
        if (page) {
            const button: Button | undefined = page.buttons.find(item => (item.x === buttonX && item.y === buttonY));
            if (button) {
                var plugin: Plugin | undefined = PluginHandler.getPlugin(button.action);
                if (plugin) {
                    plugin.execute(button.params);
                }
            }
        }

        return {}
    };
}