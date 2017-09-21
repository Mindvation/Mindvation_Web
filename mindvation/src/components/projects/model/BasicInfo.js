import React, {Component} from 'react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import ProcessLabelInfo from './ProcessLabelInfo';
import AddRole from './AddRole';

const businessOptions = [{
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
}];

class BasicInfo extends Component {
    render() {
        return (
            <div className="model-basic">
                <Input label="模型名称" horizontal={true} fullWidth={true}/>
                <Select label="模型所属行业" options={businessOptions} horizontal={true}/>
                <ProcessLabelInfo/>
                <AddRole/>
            </div>
        );
    }
}

export default BasicInfo;
