import Plugin from '../../Plugin';

export default class PluginExecute extends Plugin {
    path: string = "";
    args: string[] = [];

    constructor(params: any = {}) {
        super(params);

        this.path = params.path;
        this.args = params.args;
    }

    executePre() {
        console.log("Pre: " + this.path + " " + this.args.join(' '));
    }

    executePost() {
        console.log("Post: " + this.path + " " + this.args.join(' '));
    }

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        return true;
    }
}