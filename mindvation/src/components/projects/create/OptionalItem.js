import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Checklists from '../../../containers/checklist_container';
import AddChecklist from './AddChecklist';
import {FormattedMessage} from 'react-intl';
import UploadFile from '../../common/UploadFile';
import {addTempChecklists} from '../../../actions/checklist_action';
import {retrieveStaff} from '../../../util/Service';
import Image from '../../common/Image';

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
        const {dispatch, showAction, info = {}, isEdit} = this.props;
        const {assignOption} = this.state;
        return (
            <Modal.Content>
                <div className={isEdit ? "edit-modal-description" : "modal-description"}>
                    <div className="modal-header">
                        <Image name={isEdit ? "optional_info_black" : "optional_info"}/>
                        <FormattedMessage
                            id='optionalItems'
                            defaultMessage='Optional Items'
                        />
                    </div>
                </div>
                <div className={isEdit ? "" : "model-container"}>
                    <div className="model-second-header">
                        <FormattedMessage
                            id='Checklists'
                            defaultMessage='Checklists'
                        />
                    </div>
                    <AddChecklist dispatch={dispatch}
                                  assignOption={assignOption}
                    />
                    <Checklists
                        ref={node => {
                            this.checklistsNode = node
                        }}
                        showAction={showAction}
                        dispatch={dispatch}
                        assignOption={assignOption}
                    />
                    <UploadFile label="Attachments" icon="attach" ref={node => this.uploadFileNode = node}
                                defaultFileList={info.fileList}/>
                </div>
            </Modal.Content>
        );
    }
}

export default OptionalItem;
