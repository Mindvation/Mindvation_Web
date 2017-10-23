import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import Select from '../../common/Select';
import {genderOptions} from '../../../res/data/dataOptions';
import AddTags from "../../../containers/tag_container";

class EmployeeInfo extends Component {

    getInfo = () => {
        return {
            name: this.nameNode.getWrappedInstance().getValue(),
            logonName: this.logonNameNode.getWrappedInstance().getValue(),
            initialPassword: this.initialPasswordNode.getWrappedInstance().getValue(),
            gender: this.genderNode.getWrappedInstance().getValue(),
            position: this.positionNode.getWrappedInstance().getValue(),
            department: this.departmentNode.getWrappedInstance().getValue(),
            positionLevel: this.positionLevelNode.getWrappedInstance().getValue(),
            mail: this.mailNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            skillTags: this.skillTagsNode.getWrappedInstance().getValue().length,
            status: 'active'
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <Input label="Employee Name" horizontal={true} icon="user"
                       ref={node => this.nameNode = node}
                       defaultValue={info.name}
                />
                <Input label="Logon Name" horizontal={true} icon="user"
                       ref={node => this.logonNameNode = node}
                       defaultValue={info.logonName}
                />
                <Input label="Initial Password" horizontal={true} icon="user"
                       ref={node => this.initialPasswordNode = node}
                       defaultValue={info.initialPassword}
                />
                <Select options={genderOptions} label="Gender" horizontal={true} icon="user"
                        ref={node => this.genderNode = node}
                        defaultValue={info.gender}
                />
                <Select options={genderOptions} label="Department" horizontal={true} icon="user"
                        ref={node => this.departmentNode = node}
                        defaultValue={info.department}
                />
                <Select options={genderOptions} label="Position" horizontal={true} icon="user"
                        ref={node => this.positionNode = node}
                        defaultValue={info.position}
                />
                <Select options={genderOptions} label="Position Level" horizontal={true} icon="user"
                        ref={node => this.positionLevelNode = node}
                        defaultValue={info.positionLevel}
                />
                <Input label="Mail" horizontal={true} icon="mail"
                       ref={node => this.mailNode = node}
                       defaultValue={info.mail}
                />
                <Input label="Phone" horizontal={true} icon="phone"
                       ref={node => this.phoneNode = node}
                       defaultValue={info.phone}
                />

                <div className={"components-item item-horizontal components-length"}>
                    <Header as='h4'>
                        <Header.Content>
                            <FormattedMessage
                                id='Skill Tags'
                                defaultMessage='Skill Tags'
                            />
                        </Header.Content>
                    </Header>
                    <AddTags ref={node => this.skillTagsNode = node}/>
                </div>
            </Modal.Content>
        );
    }
}

export default EmployeeInfo;
