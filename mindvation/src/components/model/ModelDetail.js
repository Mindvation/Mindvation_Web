import React, {Component} from 'react';
import {List} from 'semantic-ui-react';
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

    componentWillMount() {
        if (this.props && this.props.modelId) {
            this.initModelData(this.props.modelId)
        }
    }

    initModelData = (model) => {
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
                <div className="project-header">
                    <Image name='models'/>
                    <FormattedMessage
                        id='modelDetail'
                        defaultMessage='Model Detail'
                    />
                </div>
                <div className="model-detail-container">
                    <div className="components-item item-horizontal align-right">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='modelName'
                                defaultMessage='Model Name'
                            />
                        </div>
                        <div className="input-content">
                            <span className="model-display-text">{model.basicInfo.modelName}</span>
                        </div>
                    </div>
                    <div className="components-item item-horizontal align-right">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='Industry'
                                defaultMessage='Industry'
                            />
                        </div>
                        <div className="input-content">
                            <span
                                className="model-display-text">{getDesc(modelOptions, model.basicInfo.business)}</span>
                        </div>
                    </div>
                    <div className="components-item item-horizontal align-right">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='Process/Function Label'
                                defaultMessage='Process/Function Label'
                            />
                        </div>
                        <div className="model-label-main input-content model-detail-label">
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
                    <div className="components-item item-horizontal align-right">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='role'
                                defaultMessage='Role'
                            />
                        </div>
                        <div className="input-content">
                            {model.basicInfo.roles ? <DisplayRoles modelInfo={model}/> : null}
                        </div>
                    </div>
                    <div className="components-item item-horizontal align-right">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='iterationPlanModel'
                                defaultMessage='Iteration Plan Model'
                            />
                        </div>
                        <div className="input-content">
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
                                                        <div
                                                            className="iteration-label">{label.value}</div>
                                                    </div>
                                                }) : null
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div className="components-item item-horizontal align-right">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='taskAttachments'
                                defaultMessage='Task Attachments'
                            />
                        </div>
                        <div className="input-content">
                            {
                                model.attachments && model.attachments.length > 0 ?
                                    <List horizontal className="model-attach model-detail-attach">
                                        {model.attachments.map((attach) => {
                                            return <List.Item key={attach.key}>
                                                <div
                                                    className={"list-content tag-selected tag-style-" + (attach.style || 'default')}>
                                                    <span className="list-text">{attach.title}</span>
                                                </div>
                                            </List.Item>
                                        })}
                                    </List> : 'N/A'
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModelDetail;