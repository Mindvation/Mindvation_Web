import React, {Component} from 'react';
import {Step, Button, Segment, Header, Icon} from 'semantic-ui-react';
import BasicInfo from './BasicInfo';
import DisplayRoles from './DisplayRoles';
import IterationPlan from './IterationPlan';

const steps = [
    {active: true, completed: false, title: 'Basic Info', description: 'Input model basic info'},
    {active: false, completed: false, title: 'Roles Info', description: 'Confirm model roles info'},
    {active: false, completed: false, title: '迭代计划模板', description: '确认迭代计划模板'},
    {active: false, completed: false, title: '任务交付件', description: '确认任务交付件'}
];

class CreateModel extends Component {
    state = {
        steps: steps,
        activeIndex: 0,
        modelInfo: {}
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

    createModel = () => {
    };

    render() {
        const {activeIndex, steps, modelInfo} = this.state;
        return (
            <div className="project-content components-length">
                <Header as='h3'>
                    <Icon name='window maximize'/>
                    <Header.Content className={"project-title underLine"}>
                        创建模板
                    </Header.Content>
                </Header>
                <Step.Group ordered items={steps}/>
                <Segment style={{display: activeIndex === 0 ? 'block' : 'none'}}>
                    <BasicInfo ref={node => this.basicNode = node}/>
                </Segment>
                {activeIndex === 1 ? <Segment><DisplayRoles modelInfo={modelInfo}/></Segment> : null}
                {activeIndex === 2 ? <Segment>
                    <IterationPlan modelInfo={modelInfo} ref={node => this.iterationNode = node}/>
                </Segment> : null}
                <div className="create-model-footer">
                    <Button className="previous-button"
                            style={{display: activeIndex > 0 ? 'block' : 'none'}}
                            secondary onClick={() => this.previous()}>
                        Previous
                    </Button>
                    <Button className="next-button"
                            style={{display: activeIndex < steps.length - 1 ? 'block' : 'none'}}
                            primary onClick={() => this.next()}>
                        Next
                    </Button>
                    <Button className="next-button"
                            style={{display: activeIndex === steps.length - 1 ? 'block' : 'none'}}
                            primary onClick={() => this.createModel()}>
                        Done
                    </Button>
                </div>
            </div>
        );
    }
}

export default CreateModel;