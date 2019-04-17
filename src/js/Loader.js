import React from 'react';

const Loader = (props) => {
  return (
    props.percentLoaded === 100 ? "" :
    // <div className="loader">Object loading...</div>
    <div className="loader">{`Loaded: ${props.percentLoaded}%`}</div>
  );
};

export default Loader;