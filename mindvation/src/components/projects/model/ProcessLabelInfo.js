import React, {Component} from 'react';
import {Input, Header, Button, Icon} from 'semantic-ui-react';

const labelData = [
    {
        key: "l1",
        value: "登录",
        subData: [{
            key: "s1",
            value: "第三方登录"
        }, {
            key: "s2",
            value: "手机号登录"
        }, {
            key: "s3",
            value: "忘记密码"
        }, {
            key: "s4",
            value: "邮箱登录"
        }]
    },
    {
        key: "l2",
        value: "注册",
        subData: [{
            key: "s5",
            value: "账号注册"
        }, {
            key: "s6",
            value: "手机号注册"
        }, {
            key: "s7",
            value: "邮箱注册"
        }]
    },
    {
        key: "l3",
        value: "首页",
    },
    {
        key: "l4",
        value: "主要功能点1",
    },
    {
        key: "l5",
        value: "反馈",
    },
    {
        key: "l6",
        value: "主要功能点2",
    },
    {
        key: "l7",
        value: "主要功能点3",
    },
    {
        key: "l8",
        value: "主要功能点4",
    },
    {
        key: "l9",
        value: "修改bug",
    }
];

let labelKey = 0;
let subLabelKey = 0;

class ProcessLabelInfo extends Component {
    state = {
        labelData: [],
        modalOpen: false
    };

    addLabel = () => {
        let tempData = this.state.labelData;
        tempData.push({key: "L" + labelKey++, value: ""});
        this.setState({
            labelData: tempData
        })
    };

    addSubLabel = (labelData, label) => {
        label.subData ? label.subData.push({
            key: "S" + subLabelKey++,
            value: ""
        }) : label.subData = [{key: "S" + subLabelKey++, value: ""}];
        this.setState({
            labelData: labelData
        })
    };

    removeSubLabel = (labelData, label, subLabel) => {
        label.subData.splice(label.subData.indexOf(subLabel), 1);
        this.setState({
            labelData: labelData
        })
    };

    removeLabel = (label) => {
        let index = -1;
        let tempData = this.state.labelData;
        tempData.some((data, i) => {
            if (data.key === label.key) {
                index = i;
                return true;
            }
        });
        if (index === -1) return;
        tempData.splice(index, 1);
        this.setState({
            labelData: tempData
        })
    };

    render() {
        const {labelData} = this.state;
        return (<div className={"model-label-cont item-horizontal components-item"}>
            <Header as='h4'>
                <Header.Content>
                    过程/方法/模块/功能点
                </Header.Content>
            </Header>
            <div className="model-label-main">
                <Button className="model-add-label" onClick={() => this.addLabel()}>新增 过程/方法/模块/功能点</Button>
                {
                    labelData.map((label, i) => {
                        return <div key={i} className="model-label">
                            <Input value={label.value} onChange={(event, data) => {
                                label.value = data.value;
                                this.setState({
                                    labelData: labelData
                                })
                            }}/>
                            <Button className="model-add-sub-label" onClick={() => this.addSubLabel(labelData, label)}>
                                创建子过程/方法/模块/功能点</Button>
                            <Icon name="trash" size="big" className={"mode-remove-label pointer-cursor"}
                                  onClick={() => this.removeLabel(label)}/>
                            {label.subData && label.subData.length > 0 ?
                                <div className="sub-label-cont">
                                    {label.subData.map((subLabel, j) => {
                                        return <div key={j} className="sub-label">
                                            <Input value={subLabel.value} onChange={(event, data) => {
                                                subLabel.value = data.value;
                                                this.setState({
                                                    labelData: labelData
                                                })
                                            }}/>
                                            <Icon name="trash" size="big" className={"mode-remove-label pointer-cursor"}
                                                  onClick={() => this.removeSubLabel(labelData, label, subLabel)}/>
                                        </div>
                                    })}
                                </div>
                                : null}
                        </div>
                    })
                }
            </div>
        </div>);
    }
}

export default ProcessLabelInfo;
