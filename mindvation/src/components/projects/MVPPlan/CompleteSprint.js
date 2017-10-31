import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import {FormattedMessage} from 'react-intl';
import {getNextIterations} from '../../../util/Service';

const dummyOptions = [
    {
        text: 'Sprint 3',
        value: '3'
    },
    {
        text: 'Sprint 4',
        value: '4'
    },
];

class CompleteSprint extends Component {
    state = {
        doneNumber: 0,
        donePoint: 0,
        incompleteNumber: 0,
        incompletePoint: 0,
        incompleteStories: [],
        nextIterations: [],
        checked: false
    };

    componentWillMount() {
        const {handleSprint} = this.props;
        this.checkStoryStatus(handleSprint);
    }

    checkStoryStatus = (sprint) => {
        let doneNumber = 0, donePoint = 0, incompleteNumber = 0, incompletePoint = 0, incompleteStories = [];
        if (sprint.stories && sprint.stories.length > 0) {
            sprint.stories.map((story) => {
                if (story.status === 'done') {
                    doneNumber++;
                    donePoint = donePoint + story.storyPoint;
                } else {
                    incompleteNumber++;
                    incompleteStories.push(story.storyId);
                    incompletePoint = incompletePoint + story.storyPoint;
                }
            })
        }

        this.setState({
            doneNumber,
            donePoint,
            incompleteNumber,
            incompletePoint,
            incompleteStories
        });

        if (incompleteNumber > 0) {
            getNextIterations(sprint.key, (iterations) => {
                let tempIterations = [];
                if (iterations && iterations.length > 0) {
                    iterations.map((item) => {
                        if (!item) return;
                        tempIterations.push({
                            value: item.uuId,
                            text: item.name
                        })
                    })
                }

                this.setState({
                    nextIterations: tempIterations
                })
            })
        }

    };

    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            moveToSprint: this.moveToNode.getWrappedInstance().getValue(),
            movedStories: this.state.incompleteStories
        };
    };

    render() {
        const {
            doneNumber,
            donePoint,
            incompleteNumber,
            incompletePoint,
            nextIterations,
            checked
        } = this.state;

        const {handleSprint} = this.props;

        return (
            <Modal.Content>
                <Modal.Description>
                    <Header as="h3" className="modal-header">
                        {handleSprint.text}
                    </Header>
                </Modal.Description>
                <div className="components-item">
                    <div>{doneNumber} issues were done ({donePoint} point)</div>
                    <div>{incompleteNumber} issues were incomplete ({incompletePoint} point)</div>
                    {incompleteNumber > 0 ?
                        <div>
                            <div style={{marginTop: '1em'}}>Select where all incomplete issues should be moved:</div>
                            <Select
                                checked={checked}
                                horizontal={true}
                                required={true}
                                options={nextIterations} label="Move To"
                                ref={node => {
                                    this.moveToNode = node
                                }}
                            />
                        </div> : null
                    }
                </div>
            </Modal.Content>
        );
    }
}

export default CompleteSprint;
