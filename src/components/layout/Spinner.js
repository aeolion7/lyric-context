import React from 'react';
import spinner from './spinner.gif';

const spinnerStyles = {
  width: '200px',
  margin: '40px auto',
  display: 'block',
};

export default () => {
  return (
    <>
      <img src={spinner} alt="Loading..." style={spinnerStyles} />
    </>
  );
};
