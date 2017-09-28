import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ChannelsList from './containers/ChannelsList';
import ChannelDetails from './containers/ChannelDetails';
import NotFound from './containers/NotFound';
import client from './configureClient';

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                      <Route exact path="/" component={ChannelsList}/>
                      <Route path="/channel/:channelId" component={ChannelDetails}/>
                      <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider> 
        );
    }
}

export default App;
