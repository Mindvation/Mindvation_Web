import React, {Component} from 'react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import ProcessLabelInfo from './ProcessLabelInfo';
import AddRole from './AddRole';
import {modelOptions} from '../../../res/data/dataOptions';

/*const businessOptions = [{
    text: "软件",
    value: "softWare"
}, {
    text: "制造",
    value: "manufacturing"
}, {
    text: "土木",
    value: "civil"
}, {
    text: "进出口",
    value: "IE"
}, {
    text: "市场",
    value: "market"
}, {
    text: "运营",
    value: "operation"
}, {
    text: "商务",
    value: "business"
}, {
    text: "服务",
    value: "service"
}];*/

class BasicInfo extends Component {

    getInfo = () => {
        return {
            modelName: this.modeNameNode.getWrappedInstance().getValue(),
            business: this.businessNode.getWrappedInstance().getValue(),
            processLabel: this.processLabelNode.getInfo(),
            roles: this.roleNode.getInfo()
        }
    };

    render() {
        return (
            <div className="model-basic">
                <Input label="Model Name" horizontal={true} fullWidth={true}
                       ref={node => this.modeNameNode = node}/>
                <Select label="Industry" options={modelOptions} horizontal={true}
                        ref={node => this.businessNode = node}
                />
                <ProcessLabelInfo ref={node => this.processLabelNode = node}/>
                <AddRole ref={node => this.roleNode = node}/>
            </div>
        );
    }
}

export default BasicInfo;
