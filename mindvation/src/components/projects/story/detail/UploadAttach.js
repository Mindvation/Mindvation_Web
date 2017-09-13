import React, {Component} from 'react';
import {Grid, Segment, Button, Header, Input} from 'semantic-ui-react';
import BurnDownChart from '../../detail/BurnDownChart';
import EfficiencyDashboard from '../../detail/EfficiencyDashboard';
import ProgressDashboard from '../../detail/ProgressDashboard';
import UploadMulti from '../../../common/UploadMulti';
import MultiImage from '../../../common/MultiImage';
import {getTimeAndRandom} from '../../../../util/CommUtil';

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
    },
    {
        key: "custom",
        text: "自定义"
    }
];

class UploadAttach extends Component {
    state = {
        moduleArray: []
    };

    addModule = (module) => {
        let tempArray = this.state.moduleArray;
        if (module.key === 'custom') {
            tempArray.push({
                key: getTimeAndRandom(),
                custom: true,
                text: "自定义",
                component: <UploadMulti/>
            });
            this.setState({
                moduleArray: tempArray
            })
        } else {
            if (tempArray.indexOf(module) === -1) {
                tempArray.push(module);
                this.setState({
                    moduleArray: tempArray
                })
            }
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
                                    {module.custom ?
                                        <Input
                                            action={{
                                                style: {cursor: 'pointer'},
                                                icon: 'search',
                                                onClick: () => alert("111")
                                            }}
                                            labelPosition='right'
                                        /> : <Header as='h4'>
                                            <Header.Content>
                                            <span className="underLine">
                                                {module.text}
                                            </span>
                                            </Header.Content>
                                        </Header>}
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
