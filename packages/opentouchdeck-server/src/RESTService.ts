import { API } from '@opentouchdeck/opentouchdeck';
import * as express from 'express';

export default class RESTService {
    private port: number;
    private apiotd: API;

    constructor(port: number) {
        this.port = port;
        this.apiotd = new API();
    }

    start() {
        let app = express();

        app.listen(this.port);

        app.get('/actions', async (req: any, res) => {
            res.send(this.apiotd.actions.getActions());
        });

        app.get('/actions/:name', async (req: any, res) => {
            res.send(this.apiotd.actions.getAction(req.params.name));
        });

        app.post('/buttons/:button', async (req: any, res) => {
            res.send(this.apiotd.buttons.buttonEvent(req.params.button))
        });
    }
}