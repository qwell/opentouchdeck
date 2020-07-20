import Button from '../Buttons/Button';
import ConfigData from '../Configs/ConfigData';
import Page from '../Pages/Page';
import BaseActionData from '../Actions/BaseActionData';

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
            return button !== undefined ? button : null;
        }
        return null;
    }

    buttonEvent(pageName: string, buttonPosition: number, buttonParams?: any): any {
        const page: Page | undefined = ConfigData.getPage(pageName);
        // TODO Get rid of this nesting, once var? is figured out
        if (page) {
            const button: Button | undefined = page.buttons.find(item => item.position === buttonPosition);
            if (button) {
                console.log(button);
                const actionData: BaseActionData | undefined = button.actionData;
                if (actionData) {
                    actionData.execute(button.buttonInfo, buttonParams);
                }
            }
        }

        return {}
    };
}