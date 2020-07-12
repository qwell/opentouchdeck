import ActionsAPI from "./ActionsAPI";
import ButtonsAPI from "./ButtonsAPI";
import ConfigAPI from "./ConfigAPI";

export default class API {
    readonly actions = new ActionsAPI();
    readonly buttons = new ButtonsAPI();
    readonly config = new ConfigAPI();
}