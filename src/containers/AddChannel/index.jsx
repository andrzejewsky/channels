import React from 'react';
import { gql, graphql } from 'react-apollo';
import Input from '../../components/Input';
import { addChannelMutation } from './queries';

const AddChannel = ({ mutate }) => {

    const handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
            evt.persist();

            mutate({
                variables: { name: evt.target.value },
                optimisticResponse: {
                    addChannel: {
                        name: evt.target.value,
                        id: Math.round(Math.random() * -1000000),
                        __typename: 'Channel'
                    }
                },
                update: (store, { data: { addChannel } }) => {
                    const query = gql`
                        query channelListQuery {
                            channels {
                                id
                                name
                            }
                        }
                    `;

                    const data = store.readQuery({ query });

                    data.channels.push(addChannel);

                    store.writeQuery({ query, data });
                }
            }).then(res => {
                evt.target.value = '';
            });
        }
    };

    return (<Input className="input--transparent" placeholder="New Channel" onKeyUp={handleKeyUp} />);
}

export default graphql(addChannelMutation)(AddChannel);