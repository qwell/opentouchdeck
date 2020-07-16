import BaseActionData from './BaseActionData';

import TwitchClient, { AuthProvider, RefreshableAuthProvider, StaticAuthProvider } from 'twitch';
import ChatClient from 'twitch-chat-client';

export default class ActionDataTwitch extends BaseActionData {
    constructor(data: any = {}) {
        super(data);

        //TODO Put all of this into a subclass (or something).
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
        const DUMMY_clientId = "krlv0gb85zvxupzqqsxh5guczlazek";
        const DUMMY_clientSecret = "dkin0ura8kwlhuwmw1ly9vdvz9detv";
        const DUMMY_token = {
            accessToken: "",
            refreshToken: "",
            expiryDate: null
        };

        function saveToken(newToken: any) {
            console.log(newToken);
        }

        const client: TwitchClient = TwitchClient.withCredentials(DUMMY_clientId, DUMMY_token.accessToken/*, scope,
            {
                clientSecret: DUMMY_clientSecret,
                refreshToken: DUMMY_token.refreshToken,
                onRefresh: accessToken => saveToken(accessToken),
                expiry: DUMMY_token.expiryDate
            },
            {
                preAuth: true,
                initialScopes: scope
            }
        */);

        /*await*/ const twitchChat = ChatClient.forTwitchClient(client, { "channels": ['northantara'] });
        twitchChat.connect();

        /*
        twitchChat.onPrivmsg(async (currentChannel, user, message, msg) => {
            var apiotd = new API();
            apiotd.config.reloadConfig(path.join(__dirname, '../../testconfig.json'));
        });
        */
    }

    protected executePre(data: any = {}) {
        console.log("Pre");
    }

    protected executePost(data: any = {}) {
        console.log("Post");
    }
}