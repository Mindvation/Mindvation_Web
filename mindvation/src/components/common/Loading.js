import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Dimmer, Loader} from 'semantic-ui-react'

let defaultLoad = "default-loading";

let idDispose = (id) => {
    return ( defaultLoad + ((id || "M").charCodeAt(0)) + 888 );
};

let StaticLoad = {
    default: (id, message) => {
        let div = document.createElement('div');
        div.id = idDispose(id) || defaultLoad;
        document.body.appendChild(div);
        ReactDOM.render((
            <Dimmer active>
                <Loader size='big'>{message || 'Loading...'}</Loader>
            </Dimmer>), div);
    },
    show: (id, message) => {
        StaticLoad.default(id, message);
    },

    remove: (id) => {
        let defaultId = "#" + (idDispose(id) || defaultLoad);
        let loadNode = document.querySelector(defaultId);

        loadNode && document.body.removeChild(loadNode);
    }
};

export default StaticLoad;