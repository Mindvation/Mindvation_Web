import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import Input from '../../common/Input';
import DatePicker from '../../common/DatePicker';
import AddTags from "../../../containers/tag_container";
import SelectMembers from '../../../containers/role_container';
import {FormattedMessage} from 'react-intl';
import {getModelById} from '../../../util/Service';
import {setRoles} from '../../../actions/role_action';
import {priorityOptions} from '../../../res/data/dataOptions';
import Image from '../../common/Image';

class AdditionalInfo extends Component {
    state = {
        model: this.props.requirement ? this.props.requirement.model : '',
        functionLabel: '',
        functionOptions: [],
        roles: [],
        tempTags: this.props.requirement ? this.props.requirement.tags || [] : []
    };

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

        if (this.functionLabelOtherNode) {
            addInfo.otherFunctionLabel = this.functionLabelOtherNode.getWrappedInstance().getValue()
        }

        return addInfo;
    };

    handleModelChange = (model) => {
        this.setState({
            model: model
        });
        getModelById(model, function (option) {
            if (option.functionOptions && option.functionOptions.length > 0) {
                option.functionOptions.push({
                    text: <FormattedMessage
                        id='other'
                        defaultMessage='Other'
                    />,
                    value: 'other'
                });
                this.setState({
                    functionOptions: option.functionOptions,
                });
            } else {
                option.functionOptions = [{
                    text: <FormattedMessage
                        id='other'
                        defaultMessage='Other'
                    />,
                    value: 'other'
                }];
                this.setState({
                    functionOptions: option.functionOptions,
                });
                this.setState({
                    functionLabel: 'other'
                })
            }

            this.props.dispatch(setRoles(option.roles));
        }.bind(this));
    };

    handleLabelChange = (label) => {
        this.setState({
            functionLabel: label
        })
    };

    getModelInfo = (modelId) => {
        const {project, isEdit} = this.props;
        if (!isEdit) {
            if (project.softwareModel && project.softwareModel.value === modelId) {
                return project.softwareModel.text;
            }
            if (project.engineeringModel && project.engineeringModel.value === modelId) {
                return project.engineeringModel.text;
            }
            if (project.businessModel && project.businessModel.value === modelId) {
                return project.businessModel.text;
            }
            if (project.techniqueModel && project.techniqueModel.value === modelId) {
                return project.techniqueModel.text;
            }
            return modelId;
        }
    };

    render() {
        const {requirement = {}, project, isEdit} = this.props;
        const {model, functionOptions, tempTags, functionLabel} = this.state;
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
                <div className={isEdit ? "edit-modal-description" : "modal-description"}>
                    <div className="modal-header">
                        <Image name={isEdit ? "additional_info_black" : "additional_info"}/>
                        <FormattedMessage
                            id='additionalInfo'
                            defaultMessage='Additional Info'
                        />
                    </div>
                </div>
                <div className={isEdit ? "" : "model-container"}>
                    <div className={"components-item item-horizontal align-right"}>
                        <div className='field-title'>
                            <div>
                                <FormattedMessage
                                    id='tags'
                                    defaultMessage='Tags'
                                />
                            </div>
                        </div>
                        <AddTags
                            ref={node => {
                                this.addTagsNode = node
                            }}
                            defaultValue={requirement.tags}
                            onChange={(tags) => {
                                this.setState({
                                    tempTags: tags
                                })
                            }}
                        />
                    </div>
                    <Select icon="flag" options={priorityOptions} label="Priority"
                            placeHolder="priorityPlaceHolderDesc"
                            ref={node => {
                                this.priority = node
                            }}
                            defaultValue={requirement.priority}
                    />
                    {isEdit ? null : <Select icon="file" options={modelOptions}
                                             label="Requirement Model"
                                             defaultValue={requirement.Model}
                                             onChange={(value) => this.handleModelChange(value)}
                    />}
                    {(!isEdit && model) ? <Select icon="sitemap" options={functionOptions}
                                                  disabled={functionOptions.length === 1}
                                                  label="Process/Function Label"
                                                  placeHolder="functionLabelPlaceHolderDesc"
                                                  ref={node => {
                                                      this.functionLabelNode = node
                                                  }}
                                                  defaultValue={requirement.functionLabel}
                                                  onChange={(value) => this.handleLabelChange(value)}
                    /> : null}
                    {(!isEdit && model && functionLabel === 'other') ?
                        <Input
                            ref={node => {
                                this.functionLabelOtherNode = node
                            }}/> : null
                    }
                    {(isEdit || model) ? <SelectMembers
                        ref={node => {
                            this.rolesNode = node
                        }}
                        tags={tempTags}
                        model={this.getModelInfo(model)}
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
                </div>
            </Modal.Content>
        );
    }
}

export default AdditionalInfo;
