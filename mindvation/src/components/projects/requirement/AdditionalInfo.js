import React, {Component} from 'react';
import {Header, Modal, Icon} from 'semantic-ui-react';
import Select from '../../common/Select';
import Input from '../../common/Input';
import DatePicker from '../../common/DatePicker';
import AddTags from "../create/AddTags";
import ProjectRoles from '../../../containers/role_container';
import {FormattedMessage} from 'react-intl';

let priority, startEndDate, addTagsNode, rolesNode, storyPointsNode;

class AdditionalInfo extends Component {

    getInfo = () => {
        return {
            "priority": priority.getWrappedInstance().getValue(),
            "startDate": startEndDate.getValue() ? startEndDate.getValue()[0] : "",
            "endDate": startEndDate.getValue() ? startEndDate.getValue()[1] : "",
            "tags": addTagsNode.getValue(),
            "roles": rolesNode.store.getState().requirement.roles,
            "storyPoints": storyPointsNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}, requirement} = this.props;
        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        <FormattedMessage
                            id='additionalInfo'
                            defaultMessage='Additional Info'
                        />
                    </Header>
                </Modal.Description>
                <Header as='h4'>
                    <Icon name='tag'/>
                    <Header.Content>
                        <FormattedMessage
                            id='tags'
                            defaultMessage='Tags'
                        />
                    </Header.Content>
                </Header>
                <AddTags
                    ref={node => {
                        addTagsNode = node
                    }}
                    defaultValue={info.tags}
                />
                <Select icon="flag" options={global.dummyData.priorityOptions} label="Priority"
                        placeHolder="priorityPlaceHolderDesc"
                        ref={node => {
                            priority = node
                        }}
                        defaultValue={info.priority}
                />
                <ProjectRoles
                    ref={node => {
                        rolesNode = node
                    }}
                    requirement={requirement}/>

                <DatePicker icon="clock" label="Start / End Date"
                            range={true}
                            ref={node => {
                                startEndDate = node
                            }}
                            defaultValue={[info.startDate, info.endDate]}
                />
                <Input label="Story Points" icon="database" type="number"
                       ref={node => {
                           storyPointsNode = node
                       }}
                       defaultValue={info.storyPoints}
                />
            </Modal.Content>
        );
    }
}

export default AdditionalInfo;
