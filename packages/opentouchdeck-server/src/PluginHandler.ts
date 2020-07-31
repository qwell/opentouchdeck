import Plugin from './Plugin';

import { EventEmitter } from 'events';
import EventHandlers from './EventHandlers';

export default class PluginHandler {
    private static plugins: any[] = [];
    private static event: EventEmitter = new EventEmitter();

    static registerPlugin(plugin: Plugin) {
        PluginHandler.plugins.push(plugin);

        console.log("Registered Plugin: " + plugin.name);
        EventHandlers.triggers.emit('plugin/registered', plugin.name);
    }

    static getPlugin(name: string): Plugin | undefined {
        var plugin: Plugin | undefined = this.plugins.find(item => name === item.name);
        return plugin;
    }

    static onEvent(name: string, callback: (...args: any[]) => void) {
        this.event.on(name, callback);
    }

    static emitEvent(name: string, ...args: any[]) {
        this.event.emit(name, ...args);
    }
}