import ButtonsAPI from "./ButtonsAPI";
import ConfigAPI from "./ConfigAPI";
import PagesAPI from "./PagesAPI";
import VariablesAPI from "./VariablesAPI";

// TODO Make this static?
export default class API {
    readonly buttons = new ButtonsAPI();
    readonly config = new ConfigAPI();
    readonly pages = new PagesAPI();
    readonly variables = new VariablesAPI();
}