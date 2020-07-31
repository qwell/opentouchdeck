import Button from '../Buttons/Button';
import ConfigData from '../Configs/ConfigData';
import Page from '../Pages/Page';
import PluginHandler from '../PluginHandler';
import Plugin from '../Plugin';

export default class ButtonsAPI {
    getButtons(pageName: string): number[] {
        var buttonList: number[] = [];
        const page: Page | undefined = ConfigData.getPage(pageName);
        // TODO Get rid of this nesting, once var? is figured out
        if (page !== undefined) {
            page.buttons.forEach(button => buttonList.push(button.position));
        }
        return buttonList;
    }

    getButton(pageName: string, buttonPosition: number) {
        const page: Page | undefined = ConfigData.getPage(pageName);
        if (page) {
            const button: Button | undefined = page.buttons.find(item => item.position === buttonPosition);
            if (button != undefined) {
                return {
                    position: button.position,
                    icon: button.icon,
                    faicon: button.faicon,
                    triggers: button.triggers,
                    action: button.action,
                    params: button.params
                }
            }
            return null;
        }
    }

    buttonEvent(pageName: string, buttonPosition: number, buttonParams?: any): any {
        const action: string = "Twitch";
        const page: Page | undefined = ConfigData.getPage(pageName);
        // TODO Get rid of this nesting, once var? is figured out
        if (page) {
            const button: Button | undefined = page.buttons.find(item => item.position === buttonPosition);
            if (button) {
                var plugin: Plugin | undefined = PluginHandler.getPlugin(action);
                if (plugin) {
                    plugin.execute(buttonParams);
                }
                /*
                var actionData: BaseActionData | undefined
                if (button.actionDataUUID) {
                    actionData = ActionList.getActionData(button.actionDataUUID);
                }
                if (actionData) {
                    actionData.execute(buttonParams);
                }

                console.log(button);
                */
            }
        }

        return {}
    };
}