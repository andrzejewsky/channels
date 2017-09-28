import React from 'react';
import { graphql } from 'react-apollo';
import { channelDetailsQuery } from '../ChannelDetails/queries';
import { withRouter } from 'react-router';
import Input from '../../components/Input';
import { addMessageMutation } from './queries';

const AddMessage = ({ match, mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
        mutate({
            variables: {
            message: {
                channelId: match.params.channelId,
                text: evt.target.value
            }
            },
            optimisticResponse: {
                addMessage: {
                    text: evt.target.value,
                    id: Math.round(Math.random() * -1000000),
                    __typename: 'Message',
                },
            },
            update: (store, { data: { addMessage } }) => {

            const data = store.readQuery({
                query: channelDetailsQuery,
                variables: {
                    channelId: match.params.channelId,
                }
            });
            
            if (!data.channel.messages.find(msg => msg.id === addMessage.id)) {
                data.channel.messages.push(addMessage);

            }
            store.writeQuery({
                query: channelDetailsQuery,
                variables: {
                    channelId: match.params.channelId,
                },
                data
            });
            },
        });
        evt.target.value = '';
    }
  };

  return (<Input className="input--transparent" placeholder="New message" onKeyUp={handleKeyUp} />);
};

export default graphql(
    addMessageMutation
)(withRouter(AddMessage));