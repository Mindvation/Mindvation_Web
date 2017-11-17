import React, {Component} from 'react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import ProcessLabelInfo from './ProcessLabelInfo';
import AddRole from './AddRole';
import {modelOptions} from '../../../res/data/dataOptions';


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
                <Input label="Model Name"
                       ref={node => this.modeNameNode = node}/>
                <Select label="Industry" options={modelOptions}
                        ref={node => this.businessNode = node}
                />
                <ProcessLabelInfo ref={node => this.processLabelNode = node}/>
                <AddRole ref={node => this.roleNode = node}/>
            </div>
        );
    }
}

export default BasicInfo;
