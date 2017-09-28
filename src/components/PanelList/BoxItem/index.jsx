import React from 'react';

const BoxItem = ({ children, className }) => (
    <div className={"panelList__boxItem " + className}>{children}</div>
);

export default BoxItem;