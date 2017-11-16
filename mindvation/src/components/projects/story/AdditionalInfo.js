import React, {Component} from 'react';
import {Header, Modal, Icon} from 'semantic-ui-react';
import Select from '../../common/Select';
import Input from '../../common/Input';
import DatePicker from '../../common/DatePicker';
import Display from '../../common/Display';
import AddTags from "../../../containers/tag_container";
import ChooseMembers from './ChooseMembers';
import {FormattedMessage} from 'react-intl';
import {priorityOptions} from '../../../res/data/dataOptions';
import Image from '../../common/Image';

class AdditionalInfo extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.subFunctionLabelOptions = this.getSubFunctionLabelOption();
        this.subFunctionLabelValue = this.getSubFunctionLabelValue(this.subFunctionLabelOptions);
        this.subOtherLabelValue = this.getSubOtherLabelValue(this.subFunctionLabelValue);
        this.state = {
            subLabel: this.subFunctionLabelValue
        }
    }

    getInfo = () => {
        return {
            "priority": this.priority.getWrappedInstance().getValue(),
            "startDate": this.startEndDate.getValue() ? this.startEndDate.getValue()[0] : "",
            "endDate": this.startEndDate.getValue() ? this.startEndDate.getValue()[1] : "",
            "tags": this.addTagsNode.getWrappedInstance().getValue(),
            "storyPoints": this.storyPointsNode.getWrappedInstance().getValue(),
            "functionLabel": this.subFunctionLabel ? this.subFunctionLabel.getWrappedInstance().getValue() : '',
            "functionOtherLabel": this.subFunctionOtherLabel ? this.subFunctionOtherLabel.getWrappedInstance().getValue() : '',
            "functionTextLabel": this.subFunctionTextLabel ? this.subFunctionTextLabel.getWrappedInstance().getValue() : '',
            "roles": this.chooseMembersNode.getValue()
        }
    };

    getSubFunctionLabelOption = () => {
        const {info = {}, requirement = {}} = this.props;
        let options = [];
        if (info.subFunctionLabels && info.subFunctionLabels.length > 0) {
            info.subFunctionLabels.map((label) => {
                options.push({
                    text: label.name,
                    value: label.labelId
                })
            });
        } else {
            if (requirement.subFunctionLabels && requirement.subFunctionLabels.length > 0) {
                requirement.subFunctionLabels.map((label) => {
                    options.push({
                        text: label.name,
                        value: label.labelId
                    })
                });
            }
        }

        return options;
    };

    handleLabelChange = (label) => {
        this.setState({
            subLabel: label
        })
    };

    getSubFunctionLabelValue = (options) => {
        const {info = {}} = this.props;
        let defaultValue = '';
        if (info.functionLabel && options.length > 0) {
            if (info.functionLabel.parentId) {
                defaultValue = info.functionLabel.labelId;
            } else {
                defaultValue = 'other';
            }
        }
        return defaultValue;
    };

    getSubOtherLabelValue = (subValue) => {
        const {info = {}} = this.props;
        let otherValue = '';
        if (subValue === 'other') {
            otherValue = info.functionLabel ? info.functionLabel.name : '';
        } else {
            otherValue = '';
        }
        return otherValue;
    };

    render() {
        const {info = {}, requirement = {}, isEdit} = this.props;
        const {subLabel} = this.state;
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
                            <FormattedMessage
                                id='tags'
                                defaultMessage='Tags'
                            />
                        </div>
                        <AddTags
                            ref={node => {
                                this.addTagsNode = node
                            }}
                            defaultValue={info.tags}
                        />
                    </div>
                    <div className={"components-item item-horizontal align-right"}>

                        <div className='field-title'>
                            <FormattedMessage
                                id='Process/Function Label'
                                defaultMessage='Process/Function Label'
                            />
                        </div>
                        <div className="input-content display-flex">
                            <Display
                                value={requirement.functionLabel ? requirement.functionLabel.name : info.requirementFunctionLabel ? info.requirementFunctionLabel.name : ''}
                            />
                            <Image name="link" style={{marginLeft: '10px'}}/>
                            {this.subFunctionLabelOptions.length > 0 ?
                                <Select options={this.subFunctionLabelOptions}
                                        ref={node => {
                                            this.subFunctionLabel = node
                                        }}
                                        style={{width: '100%'}}
                                        addOther={true}
                                        fullWidth={true}
                                        defaultValue={this.subFunctionLabelValue}
                                        onChange={(value) => this.handleLabelChange(value)}
                                /> : null}
                            {this.subFunctionLabelOptions.length === 0 ? <Input
                                ref={node => {
                                    this.subFunctionTextLabel = node
                                }}
                                style={{flex: 1}}
                                fullWidth={true}
                                placeHolder="subFunctionLabelPHDesc"
                                defaultValue={info.functionLabel ? info.functionLabel.name : ''}
                            /> : null}
                        </div>
                    </div>

                    {subLabel === 'other' ? <Input
                        ref={node => {
                            this.subFunctionOtherLabel = node
                        }}
                        placeHolder="subFunctionLabelPHDesc"
                        defaultValue={this.subOtherLabelValue}
                    /> : null}

                    <Select options={priorityOptions} label="Priority"
                            placeHolder="priorityPlaceHolderDesc"
                            ref={node => {
                                this.priority = node
                            }}
                            defaultValue={info.priority}
                    />
                    <ChooseMembers
                        ref={node => {
                            this.chooseMembersNode = node
                        }}
                        info={info}
                        requirement={requirement}/>
                    <DatePicker label="Start / End Date"
                                range={true}
                                ref={node => {
                                    this.startEndDate = node
                                }}
                                defaultValue={[info.startDate, info.endDate]}
                    />
                    <Input label="Story Points" type="number"
                           ref={node => {
                               this.storyPointsNode = node
                           }}
                           defaultValue={info.storyPoints}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default AdditionalInfo;
