import React, {Component} from 'react';
import {Step, Button, Segment, Header, Icon} from 'semantic-ui-react';
import BasicInfo from './BasicInfo';
import DisplayRoles from './DisplayRoles';
import IterationPlan from './IterationPlan';
import Attachments from './Attachments';
import _ from 'lodash';
import {FormattedMessage} from 'react-intl';
import {createModel} from '../../../util/Service';
import ModelDetail from '../ModelDetail';

const steps = [
    {
        active: true, completed: false, key: 1,
        title: <div key={1} className="title">
            <FormattedMessage
                id='basicInfo'
                defaultMessage='Basic Info'
            />
        </div>,
        description: <div className="description">
            <FormattedMessage
                id='basicInfoDesc'
                defaultMessage='Input model basic info'
            />
        </div>
    },
    {
        active: false, completed: false, key: 2,
        title: <div key={2} className="title">
            <FormattedMessage
                id='rolesInfo'
                defaultMessage='Roles Info'
            />
        </div>,
        description: <div className="description">
            <FormattedMessage
                id='confirmRoleInfo'
                defaultMessage='Confirm model roles info'
            />
        </div>
    },
    {
        active: false, completed: false, key: 3,
        title: <div key={3} className="title">
            <FormattedMessage
                id='iterationPlanModel'
                defaultMessage='Iteration Plan Model'
            />
        </div>,
        description: <div className="description">
            <FormattedMessage
                id='designIterationPlan'
                defaultMessage='Design Iteration Plan Model'
            />
        </div>
    },
    {
        active: false, completed: false, key: 4,
        title: <div className="title">
            <FormattedMessage
                id='taskAttachments'
                defaultMessage='Task Attachments'
            />
        </div>,
        description:
            <div className="description">
                <FormattedMessage
                    id='addTaskAttachments'
                    defaultMessage='Add Task Attachments'
                />
            </div>
    }
];

class CreateModel extends Component {
    state = {
        steps: _.cloneDeep(steps),
        activeIndex: 0,
        modelInfo: {},
        showDetail: false
    };

    previous = () => {
        let tempSteps = this.state.steps;
        let tempIndex = this.state.activeIndex;
        tempSteps[tempIndex].active = false;
        tempSteps[tempIndex].completed = false;
        tempSteps[tempIndex - 1].active = true;
        tempSteps[tempIndex - 1].completed = false;

        this.setState({
            activeIndex: tempIndex - 1,
            steps: tempSteps
        });
    };

    next = () => {
        let tempSteps = this.state.steps;
        let tempIndex = this.state.activeIndex;
        let tempInfo = this.state.modelInfo;
        if (tempIndex === 0) {
            tempInfo.basicInfo = this.basicNode.getInfo();
        }
        if (tempIndex === 2) {
            tempInfo.iteration = this.iterationNode.getInfo();
        }
        tempSteps[tempIndex].active = false;
        tempSteps[tempIndex].completed = true;
        tempSteps[tempIndex + 1].active = true;
        tempSteps[tempIndex + 1].completed = false;

        this.setState({
            activeIndex: tempIndex + 1,
            steps: tempSteps,
            modelInfo: tempInfo
        });

    };

    newModel = () => {
        let tempSteps = this.state.steps;
        let tempIndex = this.state.activeIndex;
        let tempInfo = this.state.modelInfo;
        tempSteps[tempIndex].active = false;
        tempSteps[tempIndex].completed = true;
        tempInfo.attachments = this.attachNode.getInfo();
        this.setState({
            modelInfo: tempInfo
        });

        createModel(tempInfo, (res) => {
            this.setState({
                showDetail: true
            }, () => {
                this.modelDetailNode.initModelData(res.model.modelId);
            });
        })
    };

    render() {
        const {activeIndex, steps, modelInfo, showDetail} = this.state;
        return (
            <div className="project-content">
                {!showDetail ? <div>
                    <Header as='h3'>
                        <Icon name='window maximize'/>
                        <Header.Content className={"project-title underLine"}>
                            <FormattedMessage
                                id='createModel'
                                defaultMessage='Create Model'
                            />
                        </Header.Content>
                    </Header>
                    <Step.Group ordered items={steps}/>
                    <Segment className="components-length" style={{display: activeIndex === 0 ? 'block' : 'none'}}>
                        <BasicInfo ref={node => this.basicNode = node}/>
                    </Segment>
                    {activeIndex === 1 ?
                        <Segment className="components-length"><DisplayRoles modelInfo={modelInfo}/></Segment> : null}
                    {activeIndex === 2 ? <Segment className="components-length">
                        <IterationPlan modelInfo={modelInfo} ref={node => this.iterationNode = node}/>
                    </Segment> : null}
                    <Segment className="components-length" style={{display: activeIndex === 3 ? 'block' : 'none'}}>
                        <Attachments ref={node => this.attachNode = node}/>
                    </Segment>
                    <div className={"create-model-footer components-length"}>
                        <Button className="previous-button"
                                style={{display: activeIndex > 0 ? 'block' : 'none'}}
                                secondary onClick={() => this.previous()}>
                            <FormattedMessage
                                id='previous'
                                defaultMessage='Previous'
                            />
                        </Button>
                        <Button className="next-button"
                                style={{display: activeIndex < steps.length - 1 ? 'block' : 'none'}}
                                primary onClick={() => this.next()}>
                            <FormattedMessage
                                id='next'
                                defaultMessage='Next'
                            />
                        </Button>
                        <Button className="next-button"
                                style={{display: activeIndex === steps.length - 1 ? 'block' : 'none'}}
                                primary onClick={() => this.newModel()}>
                            <FormattedMessage
                                id='modelDone'
                                defaultMessage='Done'
                            />
                        </Button>
                    </div>
                </div> : null}
                {showDetail ? <ModelDetail ref={node => this.modelDetailNode = node}/> : null}
            </div>
        );
    }
}

export default CreateModel;