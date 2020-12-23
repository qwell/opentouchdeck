import ConfigData from './Configs/ConfigData';

import * as fs from 'fs';
import * as path from 'path';

export default abstract class Plugin {
    name: string = "";
    display: string = "";
    description: string = "";
    defaults: any = {};
    eventList: string[] = [];

    constructor(pluginData: any) {
        this.name = pluginData.name;
        this.display = pluginData.display;
        this.description = pluginData.description;
        this.defaults = pluginData.defaults ? pluginData.defaults : {};
    }

    static async loadFromPath(plugindir: string): Promise<Plugin> {
        var plugin: Plugin | undefined;
        var pluginfile = path.join(plugindir, 'plugin.json');

        if (!fs.existsSync(pluginfile)) {
            /* Try with a ../src/ dir for in-tree development */
            pluginfile = pluginfile.replace(path.sep + 'lib' + path.sep, path.sep + 'src' + path.sep);
            if (!fs.existsSync(pluginfile)) {
                throw new Error('Could not load plugin');
            }
        }

        const pluginConfig = fs.readFileSync(pluginfile, 'utf8');
        const pluginData = JSON.parse(pluginConfig);

        //        const Plugin: Plugin = this.loadPlugin(path.join(plugindir, 'Plugin.js'));
        const obj = await import(path.join(plugindir, 'Plugin.js'));
        plugin = new obj.default(pluginData);
        if (!plugin) {
            throw new Error('Could not load plugin');
        }

        return <Plugin>plugin;
    }

    execute(params: any = {}) {
        this.executePre(params);
        this.executePost(params);
    }

    get config(): any {
        const pluginConf = ConfigData.getPluginConfig(this.name);
        var conf: any = {};

        for (var key in this.defaults) {
            if (this.defaults.hasOwnProperty(key)) {
                conf[key] = pluginConf.data[key] ? pluginConf.data[key] : this.defaults[key];
            }
        };
        return conf;
    }

    set config(config: any) {
        ConfigData.setPluginConfig(this.name, { name: this.name, data: config });
    }

    abstract eventDataMatch(event: string, configdata: any, eventdata: any): boolean;
    abstract executePre(params: any): void;
    abstract executePost(params: any): void;
}
