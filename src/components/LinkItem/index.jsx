import React from 'react';
import { Link } from 'react-router-dom';

const LinkItem = props => (
  <Link {...props} className={['linkItem', props.className].join(' ')}>
    {props.children}
  </Link>
);

export default LinkItem;
