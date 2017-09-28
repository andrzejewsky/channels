import { PubSub, withFilter } from "graphql-subscriptions";

const channels = [{
    id: 1,
    name: 'soccer',
    messages: [{
        id: 1,
        text: 'baseball is life',
    }]
}];

const pubsub = new PubSub();

export const resolvers = {
    Query: {
        channels: () => channels,
        channel: (root, { id }) => channels.find(channel => channel.id == id),
    },
    Mutation: {
        addChannel: (root, args) => {
            const newChannel = { id: channels.length + 1, name: args.name, messages: [] };
            channels.push(newChannel);

            return newChannel;
        },
        addMessage: (root, { message }) => {
            const channel = channels.find(channel => channel.id == message.channelId);

            if(!channel)
                throw new Error("Channel does not exist");
            const newMessage = { id: channel.messages.length + 1, text: message.text };
            channel.messages.push(newMessage);

            pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });

            return newMessage;
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('messageAdded'),
                (payload, variables) => payload.channelId === variables.channelId
            )
        }
    }
};