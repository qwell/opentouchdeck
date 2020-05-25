import { ActionList, ActionExecute, BaseAction, BaseActionData } from '@opentouchdeck/opentouchdeck';
import * as express from 'express';

const DEFAULT_PORT = 2501;

let actions: any[] = [
    ActionExecute
];

actions.forEach(action => ActionList.registerAction(new action()));

const action: BaseAction | undefined = ActionList.getAction("Execute");
console.log("abc", action, "def");
if (action) {
    const AE: BaseActionData = action.createActionData({ "path": "/var/www/html" });
    AE.execute();
}

let apiotd = express();
let server = apiotd.listen(DEFAULT_PORT);

apiotd.get('/actions', async (req: any, res) => {
    res.send(ActionList.getActions());
});

apiotd.get('/actions/:actionName', async (req: any, res) => {
    res.send(ActionList.getAction(req.params.actionName));
});