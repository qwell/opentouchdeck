import Button from '../Buttons/Button';
import Page from '../Pages/Page';
import Position from '../Pages/Position';
import ConfigData from '../Configs/ConfigData';
import { BaseActionData } from '..';

export default class ButtonsAPI {
    buttonEvent(buttonPosition: number) {
        // TODO Multiple pages instead of 'default'
        const page: Page | undefined = ConfigData.getPage("default");
        const position: Position | undefined = page?.positions.find(position => position.index === buttonPosition);
        const button: Button | undefined = position?.button;
        const actionData: BaseActionData | undefined = button?.buttonData.actionData;

        actionData?.execute();
    }
}