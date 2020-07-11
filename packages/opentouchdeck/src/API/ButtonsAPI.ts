import Button from '../Buttons/Button';
import Page from '../Pages/Page';
import Position from '../Pages/Position';
import ConfigData from '../Configs/ConfigData';
import { BaseActionData } from '..';

export default class ButtonsAPI {
    buttonEvent(buttonPosition: number, buttonParams: any = {}): string {
        // TODO Multiple pages instead of 'default'
        const page: Page | undefined = ConfigData.getPage("default");
        // TODO Get rid of this nesting, once var? is figured out
        if (page) {
            const position: Position | undefined = page.positions.find((position, buttonPosition) => {
                return (position.index === buttonPosition);
            });
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