import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import AddTags from "./AddTags";

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
                    <Header as="h3" className="modal-header">Additional Info</Header>
                </Modal.Description>
                <Header as='h4'>
                    <Icon name='tag'/>
                    <Header.Content>
                        Tags
                    </Header.Content>
                </Header>
                <AddTags ref={node => {
                    addTagsNode = node
                }}/>
                <Select icon="flag" options={global.dummyData.priorityOptions} label="Priority" placeHolder="Priority"
                        ref={node => {
                            priority = node
                        }}
                />
                <Select icon="user" options={global.dummyData.assignOptions} multiple={true} label="Leaders"
                        search={true}
                        placeHolder="Leaders"
                        ref={node => {
                            leaders = node
                        }}
                />
                <DatePicker icon="clock" label="Start / End Date"
                            placeHolder={["Start Date", "End Date"]}
                            range={true}
                            ref={node => {
                                startEndDate = node
                            }}
                />
                <Header as='h4'>
                    <Icon name='file'/>
                    <Header.Content>
                        Choose Project Models
                    </Header.Content>
                </Header>
                <Select options={global.dummyData.assignOptions} label="Software Model"
                        placeHolder="Software Model"
                        horizontal={true}
                        ref={node => {
                            softwareModel = node
                        }}
                />
                <Select options={global.dummyData.assignOptions} label="Engineering Model"
                        placeHolder="Engineering Model"
                        horizontal={true}
                        ref={node => {
                            engineeringModel = node
                        }}
                />
                <Select options={global.dummyData.assignOptions} label="Business Requirement Model"
                        placeHolder="Business Requirement Models"
                        horizontal={true}
                        ref={node => {
                            businessModel = node
                        }}
                />
                <Select options={global.dummyData.assignOptions} label="Technique Model"
                        placeHolder="Technique Model"
                        horizontal={true}
                        ref={node => {
                            techniqueModel = node
                        }}
                />
                <Select icon="percent" options={global.dummyData.contingencyOptions} label="Contingency"
                        placeHolder="Contingency"
                        ref={node => {
                            contingency = node
                        }}
                />
            </Modal.Content>
        );
    }
}

export default OtherInfo;
