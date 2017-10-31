import React, {Component} from 'react';
import {Header, Modal, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import Select from '../../common/Select';
import {genderOptions, staffStatusOptions, positionLevelOptions} from '../../../res/data/dataOptions';
import AddTags from "../../../containers/tag_container";

class EmployeeInfo extends Component {
    state = {
        selectedDepartment: this.props.info ? this.props.info.department : ''
    };

    getInfo = () => {
        return {
            staffId: this.props.isEdit ? this.props.info.staffId : '',
            name: this.nameNode.getWrappedInstance().getValue(),
            logonName: this.logonNameNode.getWrappedInstance().getValue(),
            initialPassword: this.props.isEdit ? '' : this.initialPasswordNode.getWrappedInstance().getValue(),
            gender: this.genderNode.getWrappedInstance().getValue(),
            position: this.positionNode ? this.positionNode.getWrappedInstance().getValue() : '',
            department: this.departmentNode.getWrappedInstance().getValue(),
            positionLevel: this.positionLevelNode.getWrappedInstance().getValue(),
            mail: this.mailNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            skillTags: this.skillTagsNode.getWrappedInstance().getValue(),
            status: this.props.isEdit ? this.statusNode.getWrappedInstance().getValue() : "active"
        }
    };

    getPositionOption = (departmentId) => {
        const {department} = this.props;
        let options = [];
        department.some((item) => {
            if (item.value === departmentId) {
                options = item.positions;
                return true;
            }
        });
        return options;
    };

    getDepartmentOption = () => {
        const {department} = this.props;
        let options = [];
        department.map((item) => {
            options.push({
                value: item.value,
                text: item.text
            })
        });
        return options;
    };

    render() {
        const {info = {}, isEdit} = this.props;
        const {selectedDepartment} = this.state;
        const positionOption = this.getPositionOption(selectedDepartment);
        return (
            <Modal.Content>
                <Input label="Employee Name" horizontal={true} icon="user"
                       ref={node => this.nameNode = node}
                       defaultValue={info.name}
                       readOnly={isEdit}
                />
                <Input label="Logon Name" horizontal={true} icon="user"
                       ref={node => this.logonNameNode = node}
                       defaultValue={info.logonName}
                       readOnly={isEdit}
                />
                {isEdit ? null : <Input label="Initial Password" horizontal={true} icon="user"
                                        ref={node => this.initialPasswordNode = node}
                />}
                <Select options={genderOptions} label="Gender" horizontal={true} icon="heterosexual"
                        ref={node => this.genderNode = node}
                        defaultValue={info.gender}
                />
                <Select options={this.getDepartmentOption()} label="Department" horizontal={true} icon="home"
                        ref={node => this.departmentNode = node}
                        onChange={(selectedDepartment) => {
                            this.setState({
                                selectedDepartment: selectedDepartment
                            })
                        }}
                        defaultValue={info.department}
                />
                {selectedDepartment ?
                    <Select options={positionOption}
                            label="Position" horizontal={true} icon="id card"
                            ref={node => this.positionNode = node}
                            defaultValue={info.position}
                    /> : null}
                <Select options={positionLevelOptions} label="Position Level" horizontal={true} icon="setting"
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
                        <Icon name="tags"/>
                        <Header.Content>
                            <FormattedMessage
                                id='Skill Tags'
                                defaultMessage='Skill Tags'
                            />
                        </Header.Content>
                    </Header>
                    <AddTags ref={node => this.skillTagsNode = node} defaultValue={info.skillTags}/>
                </div>
                {isEdit ? <Select options={staffStatusOptions} label="Status" horizontal={true} icon="id badge"
                                  ref={node => this.statusNode = node}
                                  defaultValue={info.status}
                /> : null}
            </Modal.Content>
        );
    }
}

export default EmployeeInfo;
