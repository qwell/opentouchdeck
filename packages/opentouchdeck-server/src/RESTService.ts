import API from './API/API';

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

        app.get('/pages', async (req: any, res) => {
            res.send(this.apiotd.pages.getPages());
        });

        app.get('/page/:page', async (req: any, res) => {
            res.send(this.apiotd.pages.getPage(req.params.page));
        });

        app.get('/page/:page/buttons', async (req: any, res) => {
            res.send(this.apiotd.buttons.getButtonPositions(req.params.page));
        });

        app.get('/page/:page/button/:x/:y', async (req: any, res) => {
            res.send(this.apiotd.buttons.getButton(req.params.page, Number(req.params.x), Number(req.params.y)));
        });

        app.post('/page/:page/button/:x/:y/event', async (req: any, res) => {
            res.send(this.apiotd.buttons.buttonEvent(req.params.page, Number(req.params.x), Number(req.params.y)/*, req.body*/));
        });

        app.get('/variables', async (req: any, res) => {
            res.send(this.apiotd.variables.getVariables());
        });

        app.get('/variable/:name', async (req: any, res) => {
            res.send({ "value": this.apiotd.variables.getVariable(req.params.name) });
        });

        app.post('/variable/:name', async (req: any, res) => {
            res.send(this.apiotd.variables.setVariable(req.params.name, req.body.value !== undefined ? req.body.value : null));
        });
    }
}