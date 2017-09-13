import React, {Component} from 'react';
import {Grid, Segment, Button} from 'semantic-ui-react';
import BurnDownChart from '../../detail/BurnDownChart';
import EfficiencyDashboard from '../../detail/EfficiencyDashboard';
import ProgressDashboard from '../../detail/ProgressDashboard';
import UploadMulti from '../../../common/UploadMulti';
import MultiImage from '../../../common/MultiImage';

const moduleMapping = [
    {
        key: "prototypeMap",
        text: "原型图",
        component: <UploadMulti/>
    },
    {
        key: "UIMap",
        text: "UI效果图",
        component: <EfficiencyDashboard/>
    },
    {
        key: "logicMap",
        text: "逻辑图",
        component: <BurnDownChart/>
    },
    {
        key: "testCase",
        text: "测试用例",
        component: <MultiImage/>
    },
    {
        key: "otherAtt",
        text: "其他",
        component: <ProgressDashboard/>
    }
];

class UploadAttach extends Component {
    state = {
        moduleArray: []
    };

    addModule = (module) => {
        let tempArray = this.state.moduleArray;
        if (tempArray.indexOf(module) === -1) {
            tempArray.push(module);
            this.setState({
                moduleArray: tempArray
            })
        }
    };

    render() {
        const {moduleArray} = this.state;
        return (
            <div>
                <div>
                    {
                        moduleMapping.map((item, i) => {
                            return <Button key={i}
                                           basic
                                           className="upload-attach-button"
                                           onClick={() => this.addModule(item)}>{item.text}</Button>
                        })
                    }
                </div>
                {moduleArray.length > 0 ? <Grid className="upload-attach-content" columns={3}>
                    {
                        moduleArray.map((module, i) => {
                            return <Grid.Column key={i}>
                                <Segment padded className="story-upload-file">
                                    {module.component}
                                </Segment>
                            </Grid.Column>
                        })
                    }
                </Grid> : null}
            </div>
        );
    }
}

export default UploadAttach;
