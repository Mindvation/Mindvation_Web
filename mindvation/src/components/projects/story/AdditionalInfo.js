import React, {Component} from 'react';
import {Header, Modal, Icon, Input as SUInput} from 'semantic-ui-react';
import Select from '../../common/Select';
import Input from '../../common/Input';
import DatePicker from '../../common/DatePicker';
import Display from '../../common/Display';
import AddTags from "../create/AddTags";
import ChooseMembers from './ChooseMembers';
import {FormattedMessage} from 'react-intl';

let priority, startEndDate, addTagsNode, chooseMembersNode, storyPointsNode, subFunctionLabel;

class AdditionalInfo extends Component {

    getInfo = () => {
        return {
            "priority": priority.getWrappedInstance().getValue(),
            "startDate": startEndDate.getValue() ? startEndDate.getValue()[0] : "",
            "endDate": startEndDate.getValue() ? startEndDate.getValue()[1] : "",
            "tags": addTagsNode.getValue(),
            "storyPoints": storyPointsNode.getWrappedInstance().getValue(),
            "functionLabel": subFunctionLabel.getWrappedInstance().getValue(),
            "roles": chooseMembersNode.getValue()
        }
    };

    render() {
        const {info = {}, requirement = {}} = this.props;
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
                <Header as='h4'>
                    <Icon name='sitemap'/>
                    <Header.Content>
                        <FormattedMessage
                            id='Process/Function Label'
                            defaultMessage='Process/Function Label'
                        />
                    </Header.Content>
                </Header>
                <div style={{display: "flex"}} className="components-length">
                    <Display
                        value={requirement.functionLabel || info.requirementFunctionLabel}
                        options={global.dummyData.functionOptions}
                    />
                    <Icon name="linkify" size="big" style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
                    <Input
                        ref={node => {
                            subFunctionLabel = node
                        }}
                        style={{flex: 1, marginTop: '1em'}}
                        fullWidth={true}
                        placeHolder="subFunctionLabelPHDesc"
                        defaultValue={info.functionLabel}
                    />
                </div>
                <Select icon="flag" options={global.dummyData.priorityOptions} label="Priority"
                        placeHolder="priorityPlaceHolderDesc"
                        ref={node => {
                            priority = node
                        }}
                        defaultValue={info.priority}
                />
                <ChooseMembers
                    ref={node => {
                        chooseMembersNode = node
                    }}
                    info={info}
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
