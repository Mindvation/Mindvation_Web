import React, {Component} from 'react';
import {Header, Icon, Modal, Button, List} from 'semantic-ui-react';
import ReadOnly from '../../../common/ReadOnly';
import {FormattedMessage} from 'react-intl';
import OptionalItem from '../OptionalItem';
import {updateStory} from '../../../../actions/story_action';
import {clearTempTask} from '../../../../actions/task_action';
import DisplayFile from '../../../common/DisplayFile';

let optionalModule;

class EditOptionalInfo extends Component {

    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => {
        this.setState({modalOpen: false});
        this.props.dispatch(clearTempTask());
    };

    edit = () => {
        this.openModal();
    };

    update = () => {
        let optionalInfo = optionalModule.getInfo();
        this.props.dispatch(updateStory(optionalInfo));
        this.props.dispatch(clearTempTask());
        this.closeModal();
    };

    formatTasks = () => {
        const {story} = this.props;
        if (story.tasks && story.tasks.length) {
            return <List>
                {story.tasks.map((result, i) => {
                    return <List.Item key={i} className={"task-list-" + result.status}>
                        <List.Icon name='circle'/>
                        <List.Content>
                            <List.Description>{result.description}</List.Description>
                        </List.Content>
                    </List.Item>
                })}
            </List>;
        }
        return "";
    };

    render() {
        const {modalOpen} = this.state;
        const {story, dispatch, readOnly} = this.props;
        return (
            <div className="read-only-component">
                <Header as="h3" className="underLine" style={{display: 'flex'}}>
                    <FormattedMessage
                        id='optionalItems'
                        defaultMessage='Optional Items'
                    />
                    {
                        readOnly ? null :
                            <div className="edit-line-cont">
                                <div className="edit-info-line"/>
                                <div className="edit-info-icon" onClick={this.edit}>
                                    <Icon name='pencil'/>
                                </div>
                            </div>
                    }
                </Header>
                <ReadOnly icon="tasks" title="Tasks"
                          value={this.formatTasks()}/>
                <ReadOnly icon="attach" title="Attachments"
                          value={story.fileList && story.fileList.length > 0 ?
                              <DisplayFile fileList={story.fileList}/> : ""}/>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <OptionalItem
                        info={story}
                        dispatch={dispatch}
                        ref={node => {
                            optionalModule = node
                        }}
                        showAction={true}
                    />
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.update()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditOptionalInfo;
