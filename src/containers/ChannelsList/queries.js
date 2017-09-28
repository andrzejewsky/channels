/* eslint-disable import/prefer-default-export */

import { gql } from 'react-apollo';

export const channelsListQuery = gql`
  query channelListQuery {
    channels {
      id
      name
    }
  }
`;
