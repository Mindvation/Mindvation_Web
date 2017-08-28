import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import AddTags from "./AddTags";
import {FormattedMessage} from 'react-intl';

let priority, leaders, startEndDate, softwareModel, engineeringModel, businessModel, techniqueModel, contingency,
    addTagsNode;

class OtherInfo extends Component {

    getInfo = () => {
        return {
            "priority": priority.getValue(),
            "leaders": leaders.getValue(),
            "startDate": startEndDate.getValue() ? startEndDate.getValue()[0] : "",
            "endDate": startEndDate.getValue() ? startEndDate.getValue()[1] : "",
            "softwareModel": softwareModel.getValue(),
            "engineeringModel": engineeringModel.getValue(),
            "businessModel": businessModel.getValue(),
            "techniqueModel": techniqueModel.getValue(),
            "contingency": contingency.getValue(),
            "tags": addTagsNode.getValue()
        }
    };

    render() {
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
                <AddTags ref={node => {
                    addTagsNode = node
                }}/>
                <Select icon="flag" options={global.dummyData.priorityOptions} label="Priority" placeHolder="priorityPlaceHolderDesc"
                        ref={node => {
                            priority = node
                        }}
                />
                <Select icon="user" options={global.dummyData.assignOptions} multiple={true} label="Leaders"
                        search={true}
                        placeHolder="leadersPlaceHolderDesc"
                        ref={node => {
                            leaders = node
                        }}
                />
                <DatePicker icon="clock" label="Start / End Date"
                            range={true}
                            ref={node => {
                                startEndDate = node
                            }}
                />
                <Header as='h4'>
                    <Icon name='file'/>
                    <Header.Content>
                        <FormattedMessage
                            id='chooseProjectModels'
                            defaultMessage='Choose Project Models'
                        />
                    </Header.Content>
                </Header>
                <Select options={global.dummyData.assignOptions} label="Software Model"
                        placeHolder="softwareModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            softwareModel = node
                        }}
                />
                <Select options={global.dummyData.assignOptions} label="Engineering Model"
                        placeHolder="engineeringModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            engineeringModel = node
                        }}
                />
                <Select options={global.dummyData.assignOptions} label="Business Requirement Model"
                        placeHolder="businessRequirementModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            businessModel = node
                        }}
                />
                <Select options={global.dummyData.assignOptions} label="Technique Model"
                        placeHolder="techniqueModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            techniqueModel = node
                        }}
                />
                <Select icon="percent" options={global.dummyData.contingencyOptions} label="Contingency"
                        placeHolder="ContingencyPlaceHolderDesc"
                        ref={node => {
                            contingency = node
                        }}
                />
            </Modal.Content>
        );
    }
}

export default OtherInfo;
