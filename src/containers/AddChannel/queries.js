import { gql } from 'react-apollo';

export const addChannelMutation = gql`
    mutation addChannel($name: String!) {
        addChannel(name: $name) {
            id
            name
        }
    }
`;