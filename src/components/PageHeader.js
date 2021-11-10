import React from 'react';
import './css/PageHeader.css';
const PageHeader = ({ text, color, size }) => {
  return (
    <h1 className='pageHeader' style={{ color, fontSize: `${size}rem` }}>
      {text}
    </h1>
  );
};

export default PageHeader;