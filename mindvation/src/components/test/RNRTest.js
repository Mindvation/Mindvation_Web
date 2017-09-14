import React, {Component} from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MoveProject from './MoveProject';

export default class Container extends Component {

    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <MoveProject/>
            </DragDropContextProvider>
        );
    }
}