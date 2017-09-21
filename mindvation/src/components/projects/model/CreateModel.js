import React, {Component} from 'react';
import {Step, Button, Segment} from 'semantic-ui-react';
import BasicInfo from './BasicInfo';
import DisplayRoles from './DisplayRoles';

const steps = [
    {active: true, completed: false, title: 'Basic Info', description: 'Input model basic info'},
    {active: false, completed: false, title: 'Roles Info', description: 'Confirm model roles info'},
    {active: false, completed: false, title: 'Confirm Order', description: 'Verify order details'},
];

class CreateModel extends Component {
    state = {
        steps: steps,
        activeIndex: 0
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
        tempSteps[tempIndex].active = false;
        tempSteps[tempIndex].completed = true;
        tempSteps[tempIndex + 1].active = true;
        tempSteps[tempIndex + 1].completed = false;

        this.setState({
            activeIndex: tempIndex + 1,
            steps: tempSteps
        });
    };

    createModel = () => {
    };

    render() {
        const {activeIndex, steps} = this.state;
        return (
            <div className="project-content components-length">
                <Step.Group ordered items={steps}/>
                <Segment style={{display: activeIndex === 0 ? 'block' : 'none'}}>
                    <BasicInfo/>
                </Segment>
                {activeIndex === 1 ? <Segment><DisplayRoles/></Segment> : null}
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