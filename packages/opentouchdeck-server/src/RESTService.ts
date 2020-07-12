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
            // TODO Store config filename in variable storage
            res.send(this.apiotd.config.loadConfig(path.join(__dirname, '../testconfig.json')));
        });

        app.get('/config/reload', async (req: any, res) => {
            // TODO Store config filename in variable storage
            res.send(this.apiotd.config.reloadConfig(path.join(__dirname, '../testconfig.json')));
        });

        app.get('/actions', async (req: any, res) => {
            res.send(this.apiotd.actions.getActions());
        });

        app.get('/actions/:name', async (req: any, res) => {
            res.send(this.apiotd.actions.getAction(req.params.name));
        });

        app.get('/pages', async (req: any, res) => {
            res.send(this.apiotd.pages.getPages());
        });

        app.get('/page/:page', async (req: any, res) => {
            res.send(this.apiotd.pages.getPage(req.params.page));
        });

        app.get('/page/:page/buttons', async (req: any, res) => {
            res.send(this.apiotd.buttons.getButtons(req.params.page));
        });

        app.get('/page/:page/button/:button', async (req: any, res) => {
            res.send(this.apiotd.buttons.getButton(req.params.page, Number(req.params.button)));
        });

        app.post('/page/:page/button/:button/event', async (req: any, res) => {
            res.send(this.apiotd.buttons.buttonEvent(req.params.page, Number(req.params.button), req.body))
        });

        /*
        app.get('/variables', async (req: any, res) => {
            res.send(this.apiotd.variables.getVariables());
        });
 
        app.get('/variable/:name', async (req: any, res) => {
            res.send(this.apiotd.variables.getVariable(req.params.name));
        });
 
        app.post('/variable/:name', async (req: any, res) => {
            res.send(this.apiotd.variables.setVariable(req.params.name, req.body));
        });
        */


    }
}