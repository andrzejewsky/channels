import React from 'react';
import Indicator from '../components/Indicator';

const handleResponse = ApolloComponent => props => {
  const { data: { loading, error } } = props;

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Indicator isLoading={loading}>
      <ApolloComponent {...props} />
    </Indicator>
  );
};

export default handleResponse;
