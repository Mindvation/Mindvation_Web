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
        const {info = {}, requirement = {}} = this.props;
        const {subLabel} = this.state;
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
                <div className={"components-item item-horizontal align-right"}>
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
                        defaultValue={info.tags}
                    />
                </div>
                <div className={"components-item item-horizontal align-right"}>
                    <Header as='h4'>
                        <Icon name='sitemap'/>
                        <Header.Content>
                            <FormattedMessage
                                id='Process/Function Label'
                                defaultMessage='Process/Function Label'
                            />
                        </Header.Content>
                    </Header>
                    <div style={{display: "flex"}} className="input-content">
                        <Display
                            value={requirement.functionLabel ? requirement.functionLabel.name : info.requirementFunctionLabel ? info.requirementFunctionLabel.name : ''}
                        />
                        <Icon name="linkify" size="big" style={{marginLeft: '0.5em', marginRight: '0.5em'}}/>
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
                            style={{flex: 1, marginTop: '1em'}}
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

                <Select icon="flag" options={priorityOptions} label="Priority"
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
                <DatePicker icon="clock" label="Start / End Date"
                            range={true}
                            ref={node => {
                                this.startEndDate = node
                            }}
                            defaultValue={[info.startDate, info.endDate]}
                />
                <Input label="Story Points" icon="database" type="number"
                       ref={node => {
                           this.storyPointsNode = node
                       }}
                       defaultValue={info.storyPoints}
                />
            </Modal.Content>
        );
    }
}

export default AdditionalInfo;
