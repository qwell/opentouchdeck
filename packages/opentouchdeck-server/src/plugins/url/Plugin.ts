import Plugin from '../../Plugin';

export default class PluginURL extends Plugin {
    url: string = "";
    background: boolean = false;

    constructor(params: any = {}) {
        super(params);

        this.url = params.url;
        this.background = params.background;
    }

    executePre() {
        console.log("Pre: " + this.url + (this.background ? " (Background)" : ""));
    }

    executePost() {
        console.log("Post: " + this.url + (this.background ? " (Background)" : ""));
    }

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        return true;
    }
}