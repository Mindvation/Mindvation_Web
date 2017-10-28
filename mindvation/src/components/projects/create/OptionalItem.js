import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Checklists from '../../../containers/checklist_container';
import AddChecklist from './AddChecklist';
import {FormattedMessage} from 'react-intl';
import UploadFile from '../../common/UploadFile';
import {addTempChecklists} from '../../../actions/checklist_action';
import {retrieveStaff} from '../../../util/Service';

class OptionalItem extends Component {

    state = {
        assignOption: []
    };

    componentWillMount() {
        retrieveStaff(function (option) {
            this.setState({
                assignOption: option
            })
        }.bind(this))
    }

    componentDidMount() {
        const {info = {}, dispatch} = this.props;
        if (info.checklists && info.checklists.length > 0) {
            dispatch(addTempChecklists(info.checklists))
        }
    }

    getInfo = () => {
        return {
            checklists: this.checklistsNode.store.getState().checklist,
            fileList: this.uploadFileNode.getInfo()
        };
    };

    render() {
        const {dispatch, showAction, info = {}} = this.props;
        const {assignOption} = this.state;
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
                        this.checklistsNode = node
                    }}
                    showAction={showAction}
                    dispatch={dispatch}
                    assignOption={assignOption}
                />
                <AddChecklist dispatch={dispatch}
                              assignOption={assignOption}
                />
                <UploadFile label="Attachments" icon="attach" ref={node => this.uploadFileNode = node}
                            defaultFileList={info.fileList}/>
            </Modal.Content>
        );
    }
}

export default OptionalItem;
