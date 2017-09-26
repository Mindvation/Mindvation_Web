import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Checklists from '../../../containers/checklist_container';
import AddChecklist from './AddChecklist';
import {FormattedMessage} from 'react-intl';
import UploadFile from '../../common/UploadFile';
import {addTempChecklists} from '../../../actions/checklist_action';

let checklistsNode;

class OptionalItem extends Component {
    componentDidMount() {
        const {info = {}, dispatch} = this.props;
        if (info.checklists && info.checklists.length > 0) {
            dispatch(addTempChecklists(info.checklists))
        }
    }

    getInfo = () => {
        return {
            checklists: checklistsNode.store.getState().checklist
        };
    };

    render() {
        const {dispatch, showAction} = this.props;
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
                    <Icon name='tasks'/>
                    <Header.Content>
                        <FormattedMessage
                            id='Checklists'
                            defaultMessage='Checklists'
                        />
                    </Header.Content>
                </Header>
                <Checklists
                    ref={node => {
                        checklistsNode = node
                    }}
                    showAction={showAction}
                    dispatch={dispatch}
                />
                <AddChecklist dispatch={dispatch}/>
                <UploadFile label="Attachments" icon="attach"/>
            </Modal.Content>
        );
    }
}

export default OptionalItem;
