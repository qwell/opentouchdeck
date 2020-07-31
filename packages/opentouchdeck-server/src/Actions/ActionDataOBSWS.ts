import BaseActionData from './BaseActionData';
import ActionOBSWS from './ActionOBSWS';
import ActionList from './ActionList';

export default class ActionDataOBSWS extends BaseActionData {
    constructor(params: any = {}) {
        super(params);
    }

    protected executePre() {
        console.log("Pre");

        var action: ActionOBSWS | undefined = <ActionOBSWS | undefined>ActionList.getAction("OBS WebSocket");
    }

    protected executePost() {
        console.log("Post");
    }
}