import BaseActionData from './BaseActionData';
import ActionTwitch from './ActionTwitch';
import ActionList from './ActionList';

import ChatClient from 'twitch-chat-client';

export default class ActionDataTwitch extends BaseActionData {
    channel: string;
    text: string;

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);

        this.channel = buttonInfo.channel;
        this.text = buttonInfo.text;
    }

    protected executePre() {
        console.log("Pre");

        if (!this.channel.startsWith("#")) {
            this.channel = "#" + this.channel;
        }
        var action: ActionTwitch | undefined = <ActionTwitch | undefined>ActionList.getAction("Twitch");

        if (action && action.twitchChat) {
            var twitchChat: ChatClient = action.twitchChat;
            twitchChat.say(this.channel, this.text);
        }
    }

    protected executePost() {
        console.log("Post");
    }
}