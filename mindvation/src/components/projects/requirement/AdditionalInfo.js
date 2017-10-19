import React, {Component} from 'react';
import {Header, Modal, Icon} from 'semantic-ui-react';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import AddTags from "../../../containers/tag_container";
import ProjectRoles from '../../../containers/role_container';
import {FormattedMessage} from 'react-intl';
import {getModelById} from '../../../util/Service';
import {setRoles} from '../../../actions/role_action';

class AdditionalInfo extends Component {
    state = {model: null, functionOptions: [], roles: []};

    getInfo = () => {
        let addInfo = {
            "priority": this.priority.getWrappedInstance().getValue(),
            "startDate": this.startEndDate.getValue() ? this.startEndDate.getValue()[0] : "",
            "endDate": this.startEndDate.getValue() ? this.startEndDate.getValue()[1] : "",
            "tags": this.addTagsNode.getWrappedInstance().getValue(),
            "model": this.state.model
        };

        if (this.rolesNode) {
            addInfo.roles = this.rolesNode.store.getState().role
        }

        if (this.functionLabelNode) {
            addInfo.functionLabel = this.functionLabelNode.getWrappedInstance().getValue()
        }

        return addInfo;
    };

    handelModelChange = (model) => {
        this.setState({
            model: model
        });
        getModelById(model, function (option) {
            this.setState({
                functionOptions: option.functionOptions,
            });
            this.props.dispatch(setRoles(option.roles));
        }.bind(this));
    };

    render() {
        const {requirement = {}, project, isEdit} = this.props;
        const {model, functionOptions} = this.state;
        const modelOptions = [];
        if (!isEdit) {
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
                {isEdit ? null : <Select icon="file" options={modelOptions}
                                         label="Requirement Model"
                                         defaultValue={requirement.Model}
                                         onChange={(value) => this.handelModelChange(value)}
                />}
                {!isEdit && model ? <Select icon="sitemap" options={functionOptions}
                                            label="Process/Function Label"
                                            placeHolder="functionLabelPlaceHolderDesc"
                                            ref={node => {
                                                this.functionLabelNode = node
                                            }}
                                            defaultValue={requirement.functionLabel}
                /> : null}
                {isEdit || model ? <ProjectRoles
                    ref={node => {
                        this.rolesNode = node
                    }}
                /> : null}

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
