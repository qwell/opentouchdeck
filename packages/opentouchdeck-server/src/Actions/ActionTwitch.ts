import BaseAction from './BaseAction';
import BaseActionData from './BaseActionData';
import ActionDataTwitch from './ActionDataTwitch';

import TwitchClient from 'twitch';
import ChatClient, { LogLevel } from 'twitch-chat-client';

import WSService, { WSMessage } from '../WSService';

import * as WebSocket from 'ws';

import * as fs from 'fs';

export default class ActionTwitch extends BaseAction {
    name = "Twitch";
    description = "Do Twitch stuff.  I don't know";

    twitchClient: TwitchClient;
    twitchChat: ChatClient;

    constructor() {
        super();


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

        chatHandler(this.twitchChat);
        async function chatHandler(twitchChat: ChatClient) {
            await twitchChat.connect();

            twitchChat.onPrivmsg(async (channel, user, message) => {
                /*
                TODO Emit some sort of message to our ???message queue???.
                TODO ...build a message queue.
 
                var x = {
                    name: "Twitch",
                    type: "privmsg",
                    eventData: {
                        channel: channel,
                        user: user,
                        message: message
                    }
                }
                myfakemessagequeue.emit(x);
                */

                if (channel === '#northantara' && user === 'northantara' && message.startsWith('fa-')) {
                    WSService.wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            var button = WSService.apiotd.buttons.getButton("Page Two", 1);
                            if (button) {
                                button.icon = 'fab ' + message;

                                client.send(new WSMessage('pageButtonUpdate', {
                                    page: "Page Two",
                                    button: button
                                }).toString());
                            }
                        }
                    });
                }
            });
        }
    }

    createActionData(data: any = {}): BaseActionData {
        return new ActionDataTwitch(data);
    }
}
export { ActionDataTwitch };