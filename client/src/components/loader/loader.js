import React, { useState } from 'react';
import './loader.css';

const Loader = (props) => {

    return (<div className="loader">
        <div className="backdrop">
            <div className="spinner"></div>
            <div className="logo">loading...</div>
        </div>
    </div>);
}

export default Loader;
