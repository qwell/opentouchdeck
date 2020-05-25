import ActionsAPI from "./ActionsAPI";
import ButtonsAPI from "./ButtonsAPI";

export default class API {
    readonly actions = new ActionsAPI();
    readonly buttons = new ButtonsAPI();
}