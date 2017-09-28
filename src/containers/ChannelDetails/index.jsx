import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Chat from '../../components/Chat';
import Header from '../../components/Chat/Header';
import Body from '../../components/Chat/Body';
import Footer from '../../components/Chat/Footer';
import Message from '../../components/Chat/Message';
import AddMessage from '../AddMessage';
import { channelDetailsQuery, messagesSubscription } from './queries';
import handleResponse from '../../hoc/apiResponseHandler';

class ChannelDetails extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: this.props.match.params.channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.messageAdded;

        if (!prev.channel.messages.find(msg => msg.id === newMessage.id)) {
          return Object.assign({}, prev, {
            channel: Object.assign({}, prev.channel, {
              messages: [...prev.channel.messages, newMessage],
            }),
          });
        }

        return prev;
      },
    });
  }

  render() {
    const { data: { channel } } = this.props;

    return (
      <Chat>
        <Header>{channel.name}</Header>
        <Body>
          {channel.messages.map(message => (
            <Message key={message.id}>{message.text}</Message>
          ))}
        </Body>
        <Footer>
          <AddMessage />
        </Footer>
      </Chat>
    );
  }
}

export default graphql(channelDetailsQuery, {
  options: props => ({
    variables: { channelId: props.match.params.channelId },
  }),
})(handleResponse(ChannelDetails));
