import React, {Component} from 'react';
import {Header, Modal, Icon} from 'semantic-ui-react';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import AddTags from "../../../containers/tag_container";
import ProjectRoles from '../../../containers/role_container';
import {FormattedMessage} from 'react-intl';

class AdditionalInfo extends Component {
    state = {model: null};

    getInfo = () => {
        let addInfo = {
            "priority": this.priority.getWrappedInstance().getValue(),
            "startDate": this.startEndDate.getValue() ? this.startEndDate.getValue()[0] : "",
            "endDate": this.startEndDate.getValue() ? this.startEndDate.getValue()[1] : "",
            "tags": this.addTagsNode.getValue()
        };

        if (this.rolesNode) {
            addInfo.roles = this.rolesNode.store.getState().requirement.roles
        }

        if (this.functionLabelNode) {
            this.functionLabel = this.functionLabelNode.getWrappedInstance().getValue()
        }

        return addInfo;
    };

    handelModelChange = (model) => {
        this.setState({
            model: model
        });
    };

    render() {
        const {requirement = {}, project} = this.props;
        const {model} = this.state;
        const modelOptions = [];
        if (project.softwareModel) {
            modelOptions.push(project.softwareModel)
        }
        if (project.engineeringModel) {
            modelOptions.push(project.engineeringModel)
        }
        if (project.businessModel) {
            modelOptions.push(project.businessModel)
        }
        if (project.techniqueModel) {
            modelOptions.push(project.techniqueModel)
        }
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
                        this.addTagsNode = node
                    }}
                    defaultValue={requirement.tags}
                />
                <Select icon="flag" options={global.dummyData.priorityOptions} label="Priority"
                        placeHolder="priorityPlaceHolderDesc"
                        ref={node => {
                            this.priority = node
                        }}
                        defaultValue={requirement.priority}
                />
                <Select icon="file" options={modelOptions}
                        label="Requirement Model"
                        ref={node => {
                            this.requirementModelNode = node
                        }}
                        defaultValue={requirement.Model}
                        onChange={(value) => this.handelModelChange(value)}
                />
                {model ? <Select icon="sitemap" options={global.dummyData.functionOptions}
                                 label="Process/Function Label"
                                 placeHolder="functionLabelPlaceHolderDesc"
                                 ref={node => {
                                     this.functionLabelNode = node
                                 }}
                                 defaultValue={requirement.functionLabel}
                /> : null}
                {model ? <ProjectRoles
                    ref={node => {
                        this.rolesNode = node
                    }}
                    requirement={requirement}/> : null}

                <DatePicker icon="clock" label="Start / End Date"
                            range={true}
                            ref={node => {
                                this.startEndDate = node
                            }}
                            defaultValue={[requirement.startDate, requirement.endDate]}
                />
                {/*<Input label="Story Points" icon="database" type="number"
                       ref={node => {
                           storyPointsNode = node
                       }}
                       defaultValue={requirement.storyPoints}
                />*/}
            </Modal.Content>
        );
    }
}

export default AdditionalInfo;
