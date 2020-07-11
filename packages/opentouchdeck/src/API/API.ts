import ActionsAPI from "./ActionsAPI";
import ButtonsAPI from "./ButtonsAPI";
import SystemAPI from "./SystemAPI";

export default class API {
    readonly actions = new ActionsAPI();
    readonly buttons = new ButtonsAPI();
    readonly system = new SystemAPI();
}