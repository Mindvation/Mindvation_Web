import React, {Component} from 'react';
import Dustbin from '../common/DropContainer';
import Box from '../common/DragBox';

const testProjects = [
    {
        projectId: 'P0001',
        description: 'test1'
    }, {
        projectId: 'P0002',
        description: 'test2'
    }, {
        projectId: 'P0003',
        description: 'test3'
    }, {
        projectId: 'P0004',
        description: 'test4'
    }, {
        projectId: 'P0005',
        description: 'test5'
    }];

class MoveProject extends Component {
    state = {
        leftProjects: Object.assign([], testProjects),
        nextProjects: []
    };

    moveProjectToNext = (project, sprint) => {
        let tempLeftPs = this.state.leftProjects;
        let tempNextPs = this.state.nextProjects;
        if (tempLeftPs.indexOf(project) > -1) {
            tempLeftPs.splice(tempLeftPs.indexOf(project), 1);
        }
        if (tempNextPs.indexOf(project) === -1) {
            tempNextPs.push(project)
        }
        this.setState({
            leftProjects: tempLeftPs,
            nextProjects: tempNextPs
        })
    };

    render() {
        const {leftProjects, nextProjects} = this.state;
        return (
            <div>
                <div style={{overflow: 'hidden', clear: 'both'}}>
                    <Dustbin>
                        {
                            nextProjects.map((project, i) => {
                                return <Box key={i} data={project}>
                                    <div>{project.projectId}</div>
                                    <div>{project.description}</div>
                                </Box>
                            })
                        }
                    </Dustbin>
                </div>
                <div style={{overflow: 'hidden', clear: 'both'}}>
                    {
                        leftProjects.map((project, i) => {
                            return <Box key={i} data={project}
                                        action={(handleData, sprint) => this.moveProjectToNext(handleData, sprint)}>
                                <div>{project.projectId}</div>
                                <div>{project.description}</div>
                            </Box>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MoveProject;