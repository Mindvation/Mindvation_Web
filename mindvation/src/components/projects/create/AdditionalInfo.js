import React, {Component} from 'react';
import {Header, Icon, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import AddTags from "../../../containers/tag_container";
import {FormattedMessage} from 'react-intl';
import {retrieveModels, retrieveStaff} from '../../../util/Service';
import {priorityOptions, contingencyOptions} from '../../../res/data/dataOptions';

let priority, leaders, startEndDate, softwareModel, engineeringModel, businessModel, techniqueModel, contingency,
    addTagsNode;

class OtherInfo extends Component {

    state = {
        modelOption: {
            softwareOption: [],
            engineeringOption: [],
            businessOption: [],
            techniqueOption: []
        },
        assignOption: []
    };

    componentWillMount() {
        retrieveModels(function (option) {
            this.setState({
                modelOption: option
            })
        }.bind(this));
        retrieveStaff(function (option) {
            this.setState({
                assignOption: option
            })
        }.bind(this))
    }

    getInfo = () => {
        return {
            "priority": priority.getWrappedInstance().getValue(),
            "leaders": leaders.getWrappedInstance().getValue(),
            "startDate": startEndDate.getValue() ? startEndDate.getValue()[0] : "",
            "endDate": startEndDate.getValue() ? startEndDate.getValue()[1] : "",
            "softwareModel": softwareModel.getWrappedInstance().getValue(),
            "engineeringModel": engineeringModel.getWrappedInstance().getValue(),
            "businessModel": businessModel.getWrappedInstance().getValue(),
            "techniqueModel": techniqueModel.getWrappedInstance().getValue(),
            "contingency": contingency.getWrappedInstance().getValue(),
            "tags": addTagsNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        const {modelOption, assignOption} = this.state;
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
                }}
                         defaultValue={info.tags}
                />
                <Select icon="flag" options={priorityOptions} label="Priority"
                        placeHolder="priorityPlaceHolderDesc"
                        ref={node => {
                            priority = node
                        }}
                        defaultValue={info.priority}
                />
                <Select icon="user" options={assignOption} multiple={true} label="Leaders"
                        search={true}
                        placeHolder="leadersPlaceHolderDesc"
                        ref={node => {
                            leaders = node
                        }}
                        defaultValue={info.displayLeaders}
                />
                <DatePicker icon="clock" label="Start / End Date"
                            range={true}
                            ref={node => {
                                startEndDate = node
                            }}
                            defaultValue={[info.startDate, info.endDate]}
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
                <Select options={modelOption.softwareOption} label="Software Model"
                        placeHolder="softwareModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            softwareModel = node
                        }}
                        defaultValue={info.softwareModel ? info.softwareModel.value : ''}
                />
                <Select options={modelOption.engineeringOption} label="Engineering Model"
                        placeHolder="engineeringModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            engineeringModel = node
                        }}
                        defaultValue={info.engineeringModel ? info.engineeringModel.value : ''}
                />
                <Select options={modelOption.businessOption} label="Business Requirement Model"
                        placeHolder="businessRequirementModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            businessModel = node
                        }}
                        defaultValue={info.businessModel ? info.businessModel.value : ''}
                />
                <Select options={modelOption.techniqueOption} label="Technique Model"
                        placeHolder="techniqueModelPlaceHolderDesc"
                        horizontal={true}
                        ref={node => {
                            techniqueModel = node
                        }}
                        defaultValue={info.techniqueModel ? info.techniqueModel.value : ''}
                />
                <Select icon="percent" options={contingencyOptions} label="Contingency"
                        placeHolder="ContingencyPlaceHolderDesc"
                        ref={node => {
                            contingency = node
                        }}
                        defaultValue={info.contingency}
                />
            </Modal.Content>
        );
    }
}

export default OtherInfo;
