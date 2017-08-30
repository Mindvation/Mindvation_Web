import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Tasks from '../../../containers/task_container';
import AddTask from './AddTask';
import {FormattedMessage} from 'react-intl';
import UploadFile from '../../common/UploadFile';
import {addTempTasks} from '../../../actions/task_action';

let tasksNode;

class OptionalItem extends Component {
    componentDidMount() {
        const {info = {}, dispatch} = this.props;
        if (info.tasks && info.tasks.length > 0) {
            dispatch(addTempTasks(info.tasks))
        }
    }

    getInfo = () => {
        return {
            tasks: tasksNode.store.getState().task
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
                    <Icon name='tasks'/>
                    <Header.Content>
                        <FormattedMessage
                            id='Tasks'
                            defaultMessage='Tasks'
                        />
                    </Header.Content>
                </Header>
                <Tasks
                    ref={node => {
                        tasksNode = node
                    }}
                />
                <AddTask dispatch={dispatch}/>
                <UploadFile label="Attachments" icon="attach"/>
            </Modal.Content>
        );
    }
}

export default OptionalItem;
