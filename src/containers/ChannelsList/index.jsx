import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import AddChannel from '../AddChannel';
import PanelList from '../../components/PanelList';
import BoxItem from '../../components/PanelList/BoxItem';
import LinkItem from '../../components/LinkItem';
import { channelsListQuery } from './queries';
import { handleResponse } from '../../hoc/apiResponseHandler';

const ChannelsList = ({ data: { channels }}) => {
    return (
        <PanelList>
        <BoxItem className="panelList__boxItem--blank">
            <AddChannel />
        </BoxItem>
        {
            channels.map(
                channel => <BoxItem

                            className={"panelList__boxItem--animation " + (channel.id < 0 ? "" : "panelList__boxItem--fadeIn")}
                            key={channel.id}>
                    <LinkItem className="linkItem--bold linkItem--fullWeight" to={channel.id < 0 ? `/` : `channel/${channel.id}`}>
                    {channel.name}
                    </LinkItem>
                </BoxItem>
            )
        }
        </PanelList>
    );
};

export default graphql(
    channelsListQuery,
    {
        options: {
            pollInterval: 5000
        }
    }
)(handleResponse(ChannelsList));