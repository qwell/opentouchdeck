import API from '../API/API';
import BaseActionData from './BaseActionData';

import TwitchClient from 'twitch';
import ChatClient, { LogLevel } from 'twitch-chat-client';

import * as fs from 'fs';

export default class ActionDataTwitch extends BaseActionData {
    private twitchClient: TwitchClient;
    private twitchChat: ChatClient;

    constructor(buttonInfo: any = {}) {
        super(buttonInfo);

        // TODO Figure out what needs to be done to make this async.

        //TODO Put all of this into a subclass (or something).
        const scope = ["chat:read", "chat:edit"];
        /*
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
        */

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

        this.twitchClient = TwitchClient.withCredentials(secretData.clientId, tokenData.accessToken, scope,
            {
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
            }
        );

        this.twitchChat = new ChatClient(this.twitchClient, { "channels": ['#northantara'] });

        chatHandler(this, this.twitchChat);
        async function chatHandler(actionData: ActionDataTwitch, twitchChat: ChatClient) {
            await twitchChat.connect();

            twitchChat.onPrivmsg(async (channel, user, message) => {
                if (channel === '#northantara' && user === 'northantara' && message === 'abc') {
                    twitchChat.say(channel, 'BOTTEST: good');
                }

                //var apiotd = new API();
                //apiotd.config.reloadConfig(path.join(__dirname, '../../testconfig.json'));
            });
        }
    }

    protected executePre() {
        console.log("Pre");

        if (!this.buttonInfo.channel.startsWith("#")) {
            this.buttonInfo.channel = "#" + this.buttonInfo.channel;
        }
        this.twitchChat.say(this.buttonInfo.channel, this.buttonInfo.text);
    }

    protected executePost() {
        console.log("Post");
    }
}