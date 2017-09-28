import React from 'react';

const Input = ({ placeholder, className, onKeyUp }) => (
    <input className={"input " + className} type="text" placeholder={placeholder} onKeyUp={onKeyUp} />
);

export default Input;