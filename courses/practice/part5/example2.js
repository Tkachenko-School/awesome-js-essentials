// creating a simple react component from scratch

import React from 'react';

// as param we have a {string} as name

const HelloWorld = ({name}) => {
    const showAlert = (event) => {
        alert('Hello everyone!');
    }

    return (<a href="#" onClick={showAlert}>{`Hi ${name}`}</a>);
}

export default HelloWorld;