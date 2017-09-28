import React from 'react';

const Message = ({ children, className }) => (
  <div className={['chat__body__message', className].join(' ')}>{children}</div>
);

export default Message;
