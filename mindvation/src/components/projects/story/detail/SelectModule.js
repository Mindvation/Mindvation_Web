import React, {Component} from 'react';
import {Header, Modal, Segment, Image, Grid, Icon} from 'semantic-ui-react';
import Input from '../../../common/Input';
import {FormattedMessage} from 'react-intl';

const modules = [{
    key: 'protoAndProgress',
    image: require('../../../../res/image/moduleIcon.png'),
    desc: <span>
        <div>模块1 适用于上传 如 原型图、效果图、测试用例等可以预览的图片为主的附件。适合 产品，测试，UI等人员。</div>
        <div>工业方面，适合上传8D/6sigma 的如 鱼骨图，柏拉图等分析与数据图形化展示用。 适合 工程师，QA等人员。</div>
        </span>
}, {
    key: 'progress',
    image: require('../../../../res/image/moduleIcon.png'),
    desc: <span>
        模块2 适用于开发人员，一般公司代码托管在Github上，因此只有进度管理功能。
        </span>
}, {
    key: 'proto',
    image: require('../../../../res/image/moduleIcon.png'),
    desc: <span>
        模块3 适用于提供复印件，照片等可一次性提供及完成的工作内容。
    </span>
}];

class SelectModule extends Component {
    state = {checked: false, selectedKey: ''};
    getInfo = () => {
        this.setState({
            checked: true
        });
        return {
            "title": this.title.getWrappedInstance().getValue(),
            "moduleType": this.state.selectedKey
        }
    };

    render() {
        const {selectedKey, checked} = this.state;
        return (
            <Modal.Content>
                <Input label="Module Name" icon="product hunt" required={true}
                       ref={node => {
                           this.title = node
                       }}
                       checked={checked}
                       placeHolder="moduleNamePhDesc"
                />
                <Header as='h4'>
                    <Icon name="cube"/>
                    <Header.Content className="input-label">
                        <FormattedMessage
                            id='moduleType'
                            defaultMessage='Module Type'
                        />
                    </Header.Content>
                </Header>
                <Grid className={"select-module" + " " + (checked && !selectedKey ? "error" : "")} columns={3}>
                    {
                        modules.map((module) => {
                            return <Grid.Column className={"select-module-item"} key={module.key}>
                                <span className="pointer-cursor"
                                      onClick={() => this.setState({selectedKey: module.key})}>
                                    <Segment
                                        className={selectedKey === module.key ? "selected" : ""}
                                        key={module.key}>
                                        <Image src={module.image}/>
                                        <div>
                                            {module.desc}
                                        </div>
                                    </Segment>
                                </span>
                            </Grid.Column>
                        })
                    }
                </Grid>
            </Modal.Content>
        );
    }
}

export default SelectModule;
