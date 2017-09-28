/* eslint-disable import/prefer-default-export */

import { gql } from 'react-apollo';

export const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;
