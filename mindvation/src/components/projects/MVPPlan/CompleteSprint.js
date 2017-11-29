import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Select from '../../common/Select';
import {FormattedMessage} from 'react-intl';
import {getNextIterations} from '../../../util/Service';

class CompleteSprint extends Component {
    state = {
        doneNumber: 0,
        donePoint: 0,
        incompleteNumber: 0,
        incompletePoint: 0,
        incompleteStories: [],
        nextIterations: []
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

        let {mvpInfo} = this.props;
        mvpInfo.name = sprint.key;
        if (incompleteNumber > 0) {
            getNextIterations(mvpInfo, (iterations) => {
                let tempIterations = [];
                if (iterations && iterations.length > 0) {
                    iterations.map((item) => {
                        if (!item) return;
                        tempIterations.push({
                            value: item.name,
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
            nextIterations
        } = this.state;

        return (
            <Modal.Content>
                <div className="components-item">
                    <div>
                        <FormattedMessage
                            id="doneIssueAndPoint"
                            defaultValue="{doneNumber} issues were done ({donePoint} point)"
                            values={{
                                doneNumber: doneNumber + '',
                                donePoint: donePoint + ''
                            }}
                        />
                    </div>
                    <div>
                        <FormattedMessage
                            id="incompleteIssueAndPoint"
                            defaultValue="{incompleteNumber} issues were incomplete ({incompletePoint} point)"
                            values={{
                                incompleteNumber: incompleteNumber + '',
                                incompletePoint: incompletePoint + ''
                            }}
                        />
                    </div>
                    {incompleteNumber > 0 ?
                        <div>
                            <div style={{marginTop: '1em'}}>
                                <FormattedMessage
                                    id="moveIssueDesc"
                                    defaultValue="Select where all incomplete issues should be moved:"
                                />
                            </div>
                            <Select
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
