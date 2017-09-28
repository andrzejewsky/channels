import React from 'react';

const Indicator = ({ children, isLoading }) => (
  <div className="indicator">
    {isLoading ? <div className="indicator__square" /> : null}
    <div
      className={[
        'indicator__content',
        isLoading ? '' : 'indicator__content--appear',
      ].join(' ')}
    >
      {isLoading ? null : children}
    </div>
  </div>
);

export default Indicator;
