import EventHandlers from '../../EventHandlers';
import Plugin from '../../Plugin';

import TwitchClient from 'twitch';
import ChatClient, { LogLevel } from 'twitch-chat-client';

import * as fs from 'fs';

export default class PluginTwitch extends Plugin {
    twitchClient: TwitchClient;
    twitchChat: ChatClient;

    constructor(params: any = {}) {
        super(params);
        //const scope = ["chat:read", "chat:edit"];
        const scope = [
            "user:read:broadcast",
            "user:edit:broadcast",
            "user:edit",
            "channel:read:subscriptions",
            "channel_editor",
            "channel_read",
            "chat:read",
            "chat:edit",
            "channel_commercial",
        ];

        var tokenData;
        var secretData;
        if (!fs.existsSync('tokens')) {
            fs.mkdirSync('tokens');
        }
        if (fs.existsSync('tokens/twitch.json')) {
            tokenData = JSON.parse(fs.readFileSync('tokens/twitch.json', 'utf-8'));
        } else {
            tokenData = {};
        }
        if (fs.existsSync('tokens/twitch-secret.json')) {
            secretData = JSON.parse(fs.readFileSync('tokens/twitch-secret.json', 'utf-8'));
        } else {
            secretData = {};
        }

        this.twitchClient = TwitchClient.withCredentials(secretData.clientId, tokenData.accessToken, scope, {
            clientSecret: secretData.clientSecret,
            refreshToken: tokenData.refreshToken,
            expiry: new Date(tokenData.expiryTimestamp),
            onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
                const newTokenData = {
                    accessToken,
                    refreshToken,
                    expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
                };
                if (!fs.existsSync('tokens')) {
                    fs.mkdirSync('tokens');
                }
                await fs.promises.writeFile('tokens/twitch.json', JSON.stringify(newTokenData, null, 4), 'utf-8');
            }
        });

        this.twitchChat = new ChatClient(this.twitchClient, { "channels": ['#northantara'] });

        chatHandler(this.twitchChat);
        async function chatHandler(twitchChat: ChatClient) {
            await twitchChat.connect();

            // This doesn't need to be in here.
            // Here probably doesn't need to be here...
            twitchChat.onPrivmsg(async (channel, user, message) => {
                EventHandlers.triggers.emit("twitch/chat", {
                    channel: channel,
                    user: user,
                    message: message
                });
            });
        }
    }

    executePre(params: any = {}) {
        switch (params.type) {
            case "sendChat":
                if (!params.channel.startsWith("#")) {
                    params.channel = "#" + params.channel;
                }
                break;
        }

        this.twitchChat.say(params.channel, params.text);
    }

    executePost(params: any = {}) {
    }

    eventDataMatch(event: string, configdata: any = {}, eventdata: any = {}): boolean {
        switch (event) {
            case "twitch/chat":
                if (configdata.channel !== undefined && configdata.channel !== eventdata.channel) {
                    return false;
                }
                if (configdata.user !== undefined && configdata.user !== eventdata.user) {
                    return false;
                }
                if (configdata.message !== undefined && configdata.message !== eventdata.message) {
                    return false;
                }

                return true;
        }

        return false;
    }
}