import React from 'react';

const RenderIf = ({ condition, children }) => {
  const show = typeof condition === 'function' ? condition() : !!condition;
  return show ? children : null;
};

export default RenderIf;
