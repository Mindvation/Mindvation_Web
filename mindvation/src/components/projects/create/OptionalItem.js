import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Checklist from '../../../containers/checklist_container';
import AddChecklist from './AddChecklist';
import {FormattedMessage} from 'react-intl';

let checkListNode;

class OptionalItem extends Component {

    getInfo = () => {
        return {
            checklist: checkListNode.store.getState().checklist
        };
    };

    render() {
        const {dispatch} = this.props;
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                        </Header>
                </Modal.Description>
                <Header as='h4'>
                    <Icon name='tag'/>
                    <Header.Content>
                        <FormattedMessage
                            id='tasks'
                            defaultMessage='Tasks'
                        />
                    </Header.Content>
                </Header>
                <Checklist ref={node => {
                    checkListNode = node
                }}/>
                <AddChecklist dispatch={dispatch}/>
            </Modal.Content>
        );
    }
}

export default OptionalItem;
