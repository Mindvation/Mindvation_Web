import React, {Component} from 'react';
import {Input, Header, Button, Icon, Modal, Segment, Label, List} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import _ from 'lodash';
import {arrOrder} from '../../../util/CommUtil';

let iterationKey = 0;

class IterationPlan extends Component {
    state = {
        planData: [],
        modalOpen: false,
        selectedLabels: [],
        leftLabels: []
    };

    componentWillMount() {
        if (this.props.modelInfo.basicInfo) {
            this.setState({
                leftLabels: Object.assign([], this.props.modelInfo.basicInfo.processLabel)
            })
        }
    }

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    updateIterationLabels = (iteration) => {
        this.handleIteration = iteration;
        let tempLeftLabels = this.state.leftLabels;
        this.beforeHandleLabels = tempLeftLabels;
        let tempSelectedLabels = this.state.selectedLabels;
        if (iteration.labels && iteration.labels.length > 0) {
            tempLeftLabels = Object.assign([], iteration.labels.concat(tempLeftLabels));
            tempSelectedLabels = Object.assign([], iteration.labels);
        }
        this.setState({
            leftLabels: arrOrder(tempLeftLabels),
            selectedLabels: tempSelectedLabels
        });

        this.openModal();
    };

    addLabelsToIteration = () => {
        let labels = arrOrder(this.state.selectedLabels);
        let tempData = this.state.planData;
        let tempLeftLabels = this.state.leftLabels;
        tempData.some((data) => {
            if (data.key === this.handleIteration.key) {
                data.labels = _.cloneDeep(labels);
                return true;
            }
        });
        labels.map((label) => {
            if (tempLeftLabels.indexOf(label) > -1) {
                tempLeftLabels.splice(tempLeftLabels.indexOf(label), 1);
            }
        });

        this.setState({
            planData: tempData,
            leftLabels: tempLeftLabels,
            selectedLabels: []
        });
        this.closeModal();
    };

    abandonAddLabel = () => {
        this.setState({
            leftLabels: this.beforeHandleLabels,
            selectedLabels: []
        });
        this.closeModal();
    };

    toggleLabels = (selectedLabels, label) => {
        if (selectedLabels.indexOf(label) > -1) {
            selectedLabels.splice(selectedLabels.indexOf(label), 1);
        } else {
            selectedLabels.push(label);
        }

        this.setState({
            selectedLabels: selectedLabels
        })
    };

    getInfo = () => {
        return this.state.planData
    };

    addIteration = () => {
        if (this.state.leftLabels.length === 0) return;
        let tempData = this.state.planData;
        tempData.push({key: "I" + iterationKey++, value: "", labels: []});
        this.setState({
            planData: tempData
        })
    };

    removeIteration = (planData, iteration) => {
        planData.splice(planData.indexOf(iteration), 1);
        let tempLeftLabels = this.state.leftLabels;
        if (iteration.labels && iteration.labels.length > 0) {
            tempLeftLabels = Object.assign([], tempLeftLabels.concat(iteration.labels));
        }
        this.setState({
            planData: planData,
            leftLabels: tempLeftLabels
        })
    };

    render() {
        const {planData, modalOpen, selectedLabels, leftLabels} = this.state;
        return (<div className="model-label-cont">
            <Header as='h4'>
                <Header.Content>
                    <FormattedMessage
                        id='iterationPlanModel'
                        defaultMessage='Iteration Plan Model'
                    />
                </Header.Content>
            </Header>
            <div className="model-label-main">
                <Button className="model-add-label" onClick={() => this.addIteration()}>
                    <FormattedMessage
                        id='addIteration'
                        defaultMessage='Add Iteration'
                    />
                </Button>
                <div>
                    {
                        planData.map((iteration, i) => {
                            return <div key={iteration.key} className="iteration-item">
                                {i === planData.length - 1 ? null : <div className="iteration-line"/>}
                                <div className="iteration-action">
                                    <Icon name="trash" size="big" className={"mode-remove-label pointer-cursor"}
                                          onClick={() => this.removeIteration(planData, iteration)}/>
                                    <Icon name="pencil" size="big" className={"mode-remove-label pointer-cursor"}
                                          onClick={() => this.updateIterationLabels(iteration)}
                                    />
                                </div>
                                <div className="iteration-container">
                                    <div>
                                        <Input autoFocus={true} onChange={(event, data) => {
                                            iteration.value = data.value;
                                        }}/>
                                    </div>
                                    {iteration.labels && iteration.labels.length > 0 ?
                                        iteration.labels.map((label) => {
                                            return <div key={label.key}>
                                                <Label
                                                    className="iteration-label">{label.value}</Label>
                                            </div>
                                        }) : null
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <Modal
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                open={modalOpen}>
                <Modal.Header>
                    <FormattedMessage
                        id='assignLabel'
                        defaultMessage='Assign Progress/Function Label'
                    />
                </Modal.Header>
                <Modal.Content>
                    <Segment className="all-tags-segment">
                        <List horizontal>
                            {leftLabels.map((label) => {
                                return <List.Item key={label.key} style={{position: 'relative'}}>
                                    {selectedLabels.indexOf(label) > -1 ?
                                        <Icon name="check circle outline" color="green" size="large"
                                              className="tags-icon"
                                        /> : null}
                                    <Button size="large" onClick={() => this.toggleLabels(selectedLabels, label)}>
                                        {label.value}
                                    </Button>
                                </List.Item>
                            })}
                        </List>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={() => this.abandonAddLabel()}>
                        <FormattedMessage
                            id='cancel'
                            defaultMessage='Cancel'
                        />
                    </Button>
                    <Button primary onClick={() => this.addLabelsToIteration()}>
                        <FormattedMessage
                            id='confirm'
                            defaultMessage='Confirm'
                        />
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>);
    }
}

export default IterationPlan;
