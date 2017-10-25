import React, {Component} from 'react';
import {Input, Header, Button, Icon} from 'semantic-ui-react';
import {Tree} from 'antd';
import {FormattedMessage} from 'react-intl';

const TreeNode = Tree.TreeNode;
let labelKey = 0;
let subLabelKey = 0;

class ProcessLabelInfo extends Component {
    state = {
        labelData: [],
        expandedKeys: [],
        modalOpen: false
    };

    getInfo = () => {
        return this.state.labelData
    };

    addLabel = () => {
        let tempData = this.state.labelData;
        tempData.push({key: "L" + labelKey++, value: ""});
        this.setState({
            labelData: tempData
        })
    };

    expandTreeNode = (expandedKeys) => {
        this.setState({
            expandedKeys
        });
        /*let tempKeys = this.state.expandedKeys;
        if (tempKeys.indexOf(expandedKeys) > -1) {
            tempKeys.splice(tempKeys.indexOf(expandedKeys), 1)
        } else {
            tempKeys.push(expandedKeys);
        }
        this.setState({
            expandedKeys: tempKeys
        })*/

    };

    addSubLabel = (labelData, label) => {
        label.subData ? label.subData.push({
            key: "S" + subLabelKey++,
            value: ""
        }) : label.subData = [{key: "S" + subLabelKey++, value: ""}];
        let tempKeys = this.state.expandedKeys;

        if (tempKeys.indexOf(label.key) === -1) {
            tempKeys.push(label.key);
        }
        this.setState({
            labelData: labelData,
            expandedKeys: tempKeys
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
        const {labelData, expandedKeys} = this.state;
        return (<div className={"model-label-cont item-horizontal components-item"}>
                <Header as='h4'>
                    <Header.Content>
                        <FormattedMessage
                            id='Process/Function Label'
                            defaultMessage='Process/Function Label'
                        />
                    </Header.Content>
                </Header>
                <div className="model-label-main">
                    <Button className="model-add-label" onClick={() => this.addLabel()}>
                        <FormattedMessage
                            id='addProcessLabel'
                            defaultMessage='Add Process/Function Label'
                        />
                    </Button>
                    <Tree
                        showLine
                        expandedKeys={expandedKeys}
                        onExpand={(expandedKeys) => this.expandTreeNode(expandedKeys)}
                    >
                        {
                            labelData.map((label) => {
                                return <TreeNode key={label.key}
                                                 title={<div className="model-label">
                                                     <Input
                                                         autoFocus={true}
                                                         size="large"
                                                         value={label.value}
                                                         onChange={(event, data) => {
                                                             label.value = data.value;
                                                             this.setState({
                                                                 labelData: labelData
                                                             })
                                                         }}/>
                                                     <Button className="model-add-sub-label"
                                                             onClick={() => this.addSubLabel(labelData, label)}>
                                                         <FormattedMessage
                                                             id='addSubProcessLabel'
                                                             defaultMessage='Add Sub Process/Function Label'
                                                         />
                                                     </Button>
                                                     <Icon name="trash" size="big"
                                                           className={"mode-remove-label pointer-cursor"}
                                                           onClick={() => this.removeLabel(label)}/>
                                                 </div>}>
                                    {label.subData && label.subData.length > 0 ?
                                        label.subData.map((subLabel) => {
                                            return <TreeNode key={subLabel.key} title={<div className="sub-label">
                                                <Input
                                                    autoFocus={true}
                                                    size="large"
                                                    value={subLabel.value}
                                                    onChange={(event, data) => {
                                                        subLabel.value = data.value;
                                                        this.setState({
                                                            labelData: labelData
                                                        })
                                                    }}/>
                                                <Icon name="trash" size="big"
                                                      className={"mode-remove-label pointer-cursor"}
                                                      onClick={() => this.removeSubLabel(labelData, label, subLabel)}/>
                                            </div>}/>
                                        }) : null}
                                </TreeNode>
                            })
                        }
                    </Tree>
                </div>

            </div>
        );
    }
}

export default ProcessLabelInfo;
