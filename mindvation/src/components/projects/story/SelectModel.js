import React, {Component} from 'react';
import {Divider, Modal, Segment, Image, Grid} from 'semantic-ui-react';
import Input from '../../common/Input';
import {FormattedMessage} from 'react-intl';
import {isEmpty} from '../../../util/CommUtil';

const models = [{
    key: 'protoAndProgress',
    image: require('../../../res/image/model1.png'),
    desc: <span>
        <div>模块1 适用于上传 如 原型图、效果图、测试用例等可以预览的图片为主的附件。适合 产品，测试，UI等人员。</div>
        <div>工业方面，适合上传8D/6sigma 的如 鱼骨图，柏拉图等分析与数据图形化展示用。 适合 工程师，QA等人员。</div>
        </span>
}, {
    key: 'progress',
    image: require('../../../res/image/model2.png'),
    desc: <span>
        模块2 适用于开发人员，一般公司代码托管在Github上，因此只有进度管理功能。
        </span>
}, {
    key: 'proto',
    image: require('../../../res/image/model3.png'),
    desc: <span>
        模块3 适用于提供复印件，照片等可一次性提供及完成的工作内容。
    </span>
}];

class SelectModel extends Component {
    state = {checked: false, selectedKey: ''};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "title": this.title.getWrappedInstance().getValue(),
            "modelType": {
                error: isEmpty(this.state.selectedKey),
                componentValue: this.state.selectedKey
            }
        }
    };

    render() {
        const {selectedKey, checked} = this.state;
        return (
            <Modal.Content>
                <Input label="Model Name" icon="product hunt" required={true}
                       ref={node => {
                           this.title = node
                       }}
                       placeHolder="modelNamePhDesc"
                />
                <div className="components-item item-horizontal align-right">
                    <div className="field-title">
                        <FormattedMessage
                            id='modelType'
                            defaultMessage='Model Type'
                        />
                    </div>
                    <Grid className={"select-model input-content " + (checked && !selectedKey ? "error" : "")}
                          columns={3}>
                        {
                            models.map((model) => {
                                return <Grid.Column className="select-model-item" key={model.key}>
                                <span className="pointer-cursor"
                                      onClick={() => this.setState({selectedKey: model.key})}>
                                    <Segment
                                        className={selectedKey === model.key ? "selected" : ""}
                                        key={model.key}>
                                        <Image src={model.image}/>
                                        <Divider className="select-model-divider"/>
                                        <div className="select-model-desc">
                                            {model.desc}
                                        </div>
                                    </Segment>
                                </span>
                                </Grid.Column>
                            })
                        }
                    </Grid>
                </div>
            </Modal.Content>
        );
    }
}

export default SelectModel;
