import { API } from '@opentouchdeck/opentouchdeck';

import * as express from 'express';
import * as path from 'path';

export default class RESTService {
    private port: number;
    private apiotd: API;

    constructor(port: number, apiotd: API = new API()) {
        this.port = port;
        this.apiotd = apiotd;
    }

    start() {
        let app = express();

        app.use(express.json()); // to support JSON-encoded bodies
        app.use(express.urlencoded());  // to support URL-encoded bodies

        app.listen(this.port);

        app.get('/config/load', async (req: any, res) => {
            res.send(this.apiotd.config.loadConfig(path.join(__dirname, '../testconfig.json')));
        });

        app.get('/config/reload', async (req: any, res) => {
            res.send(this.apiotd.config.reloadConfig(path.join(__dirname, '../testconfig.json')));
        });

        app.get('/actions', async (req: any, res) => {
            res.send(this.apiotd.actions.getActions());
        });

        app.get('/actions/:name', async (req: any, res) => {
            res.send(this.apiotd.actions.getAction(req.params.name));
        });

        app.post('/buttons/:button', async (req: any, res) => {
            res.send(this.apiotd.buttons.buttonEvent(req.params.button, req.body))
        });
    }
}