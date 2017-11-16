import React, {Component} from 'react';
import {List, Label, Segment, Header, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {Tree} from 'antd';
import DisplayRoles from './createModel/DisplayRoles';
import {getModelDetail} from '../../util/Service';
import {modelOptions} from '../../res/data/dataOptions';
import {getDesc} from '../../util/CommUtil';
import Image from '../common/Image';

const TreeNode = Tree.TreeNode;

class ModelDetail extends Component {
    state = {
        model: {
            basicInfo: {},
            iteration: [],
            attachments: []
        }
    };

    initModelData = (model) => {
        /*this.setState({
            model: model
        })*/
        getModelDetail(model, function (data) {
            this.setState({
                model: data
            })
        }.bind(this))
    };

    render() {
        const {model} = this.state;
        return (
            <div className="model-detail-display">
                <Header as='h3'>
                    <Icon name='window maximize'/>
                    <Header.Content className={"project-title underLine"}>
                        <FormattedMessage
                            id='modelDetail'
                            defaultMessage='Model Detail'
                        />
                    </Header.Content>
                </Header>
                <Segment className="components-length">
                    <div className="item-horizontal">
                        <Header as='h4'>
                            <Header.Content>
                                <FormattedMessage
                                    id='modelName'
                                    defaultMessage='Model Name'
                                />
                            </Header.Content>
                        </Header>
                        <span className="model-display-text">{model.basicInfo.modelName}</span>
                    </div>
                    <div className="item-horizontal">
                        <Header as='h4'>
                            <Header.Content>
                                <FormattedMessage
                                    id='Industry'
                                    defaultMessage='Industry'
                                />
                            </Header.Content>
                        </Header>
                        <span className="model-display-text">{getDesc(modelOptions, model.basicInfo.business)}</span>
                    </div>
                    <div className="item-horizontal">
                        <Header as='h4'>
                            <Header.Content>
                                <FormattedMessage
                                    id='Process/Function Label'
                                    defaultMessage='Process/Function Label'
                                />
                            </Header.Content>
                        </Header>
                        <div className="model-label-main">
                            <Tree
                                showLine
                            >
                                {
                                    model.basicInfo.processLabel ?
                                        model.basicInfo.processLabel.map((process, i) => {
                                            return <TreeNode title={process.value} key={i}>
                                                {
                                                    process.subData && process.subData.length > 0 ?
                                                        process.subData.map((subProcess, j) => {
                                                            return <TreeNode title={subProcess.value} key={j}/>
                                                        }) : null
                                                }
                                            </TreeNode>
                                        }) : null
                                }
                            </Tree>
                        </div>
                    </div>
                    <Header as='h4'>
                        <Header.Content>
                            <FormattedMessage
                                id='role'
                                defaultMessage='Role'
                            />
                        </Header.Content>
                    </Header>
                    {model.basicInfo.roles ? <DisplayRoles modelInfo={model}/> : null}
                    <Header as='h4'>
                        <Header.Content>
                            <FormattedMessage
                                id='iterationPlanModel'
                                defaultMessage='Iteration Plan Model'
                            />
                        </Header.Content>
                    </Header>
                    <div>
                        {
                            model.iteration.map((iteration, i) => {
                                return <div key={iteration.key} className="iteration-item iteration-display">
                                    {i === model.iteration.length - 1 ? null :
                                        <Image className="iteration-arrow" name="arrow"/>}
                                    <div className="iteration-container">
                                        <div className="iteration-value-text">
                                            {iteration.value}
                                        </div>
                                        {iteration.labels && iteration.labels.length > 0 ?
                                            iteration.labels.map((label) => {
                                                return <div key={label.key}>
                                                    <Label
                                                        className="iteration-label">{label.value}</Label>
                                                </div>
                                            }) : null
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <Header as='h4'>
                        <Header.Content>
                            <FormattedMessage
                                id='taskAttachments'
                                defaultMessage='Task Attachments'
                            />
                        </Header.Content>
                    </Header>
                    <div>
                        {
                            model.attachments && model.attachments.length > 0 ?
                                <List horizontal className="model-attach">
                                    {model.attachments.map((attach) => {
                                        return <List.Item key={attach.key}>
                                            <div className="list-content" style={{backgroundColor: attach.color}}>
                                                <span className="list-text">{attach.title}</span>
                                            </div>
                                        </List.Item>
                                    })}
                                </List> : 'N/A'
                        }
                    </div>
                </Segment>
            </div>
        );
    }
}

export default ModelDetail;