import React, { Component } from 'react';
import Indicator from '../components/Indicator';

const handleResponse = (ApolloComponent) => {
    return class Container extends Component {

        render() {

            const { data: { loading, error } } = this.props;

            if (error) {
                return <p>{error.message}</p>;
            }


            return (<Indicator isLoading={loading}><ApolloComponent {...this.props} /></Indicator>);
        }
    }
}

export { handleResponse };