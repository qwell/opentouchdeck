import Button from '../Buttons/Button';
import Page from '../Pages/Page';
import Position from '../Pages/Position';
import ConfigData from '../Configs/ConfigData';
import { BaseActionData } from '..';

export default class ButtonsAPI {
    getButtons(pageName: string): Position[] {
        const page: Page | undefined = ConfigData.getPage(pageName);
        // TODO Get rid of this nesting, once var? is figured out
        if (page !== undefined) {
            return page.positions;
        }
        return [];
    }

    getButton(pageName: string, buttonPosition: number) {

        const page: Page | undefined = ConfigData.getPage(pageName);
        // TODO Get rid of this nesting, once var? is figured out
        if (page) {
            const position: Position | undefined = page.positions.find(position => position.index === buttonPosition);
            if (position) {
                console.log(position);
                const button: Button | undefined = position.button;
                return button;
            }
        }
        return null;
    }

    buttonEvent(pageName: string, buttonPosition: number, buttonParams: any = {}): string {
        const page: Page | undefined = ConfigData.getPage(pageName);
        // TODO Get rid of this nesting, once var? is figured out
        if (page) {
            const position: Position | undefined = page.positions.find(position => position.index === buttonPosition);
            if (position) {
                console.log(position);
                const button: Button | undefined = position.button;
                if (button) {
                    console.log(button);
                    const actionData: BaseActionData | undefined = button.buttonData.actionData;
                    if (actionData) {
                        //console.log(actionData);
                        //console.log(buttonParams);
                        actionData.execute(button.buttonData.buttonInfo, buttonParams);
                    }
                }
            }
        }

        return "";
    }
}