import React from 'react';
import ScrollingBlock from '../../ScrollingBlock';

const Body = ({ children }) => (
  <div className="chat__body">
    <ScrollingBlock>{children}</ScrollingBlock>
  </div>
);

export default Body;
