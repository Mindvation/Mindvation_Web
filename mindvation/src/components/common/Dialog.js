import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Dimmer, Header, Segment, Button, Divider} from 'semantic-ui-react'

let defaultDialog = "default-dialog";
let idDispose = (id) => {
    return ( defaultDialog + ((id || "M").charCodeAt(0)) + 888 );
};


const remove = (id) => {
    let defaultId = "#" + (idDispose(id) || defaultDialog);
    let loadNode = document.querySelector(defaultId);

    loadNode && document.body.removeChild(loadNode);
};

let StaticDialog = {
    default: (id, header, message) => {
        let div = document.createElement('div');
        div.id = idDispose(id) || defaultDialog;
        div.className = "modal-component";
        document.body.appendChild(div);
        ReactDOM.render((
            <Dimmer active>
                <Segment className="dialog">
                    <Header as="h3" className="dialog-header">
                        {header || 'Error'}
                    </Header>
                    <Divider/>
                    <div className="dialog-content">
                        {message || 'UnKnow'}
                    </div>
                    <div className="dialog-footer">
                        <Button compact primary onClick={() => remove(id)}>OK</Button>
                    </div>
                </Segment>
            </Dimmer>
        ), div);
    },
    show: (id, header, message) => {
        StaticDialog.default(id, header, message);
    },

};

export default StaticDialog;