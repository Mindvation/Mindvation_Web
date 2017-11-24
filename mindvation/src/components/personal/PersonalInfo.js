import React, {Component} from 'react';
import {Segment, Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import MVImage from '../common/Image';
import SimpleUpload from '../common/SimpleUpload';
import EditPassword from './EditPassword';
import {getStaffId} from '../../util/UserStore';
import {updateUser, getUserInfo} from '../../actions/user_action';
import TagList from '../projects/create/TagList';

class PersonalInfo extends Component {
    componentWillMount() {
        this.props.dispatch(getUserInfo(getStaffId()))
    }

    updateUserPhoto = (file) => {
        this.props.dispatch(updateUser({
            staffInfo: {
                staffId: getStaffId(),
                avatar: file.response.responseBody.url
            }
        }))
    };

    render() {
        const {userInfo = {}, dispatch} = this.props;
        return (
            <div className="project-content">
                <div className="create-model-header">
                    <MVImage name='models'/>
                    <FormattedMessage
                        id='personalInfo'
                        defaultMessage='Personal Info'
                    />
                </div>
                <Segment>
                    <div className="tab-item-header">
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic info'
                        />
                    </div>
                    <div className="components-item item-horizontal">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='Position'
                                defaultMessage='Position'
                            />
                        </div>
                        <div>
                            {userInfo.position && userInfo.position.name}
                        </div>
                    </div>
                    <div className="components-item item-horizontal">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='department'
                                defaultMessage='Department'
                            />
                        </div>
                        <div>
                            {userInfo.departmentDetail && userInfo.departmentDetail.name}
                        </div>
                    </div>
                    <div className="components-item item-horizontal">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='Phone'
                                defaultMessage='Phone'
                            />
                        </div>
                        <div>
                            {userInfo.staffInfo && userInfo.staffInfo.phoneNum}
                        </div>
                    </div>
                    <div className="components-item item-horizontal">
                        <div className="display-filed-title">
                            <FormattedMessage
                                id='Mail'
                                defaultMessage='Mail'
                            />
                        </div>
                        <div>
                            {userInfo.staffInfo && userInfo.staffInfo.emailAddr}
                        </div>
                    </div>

                    <EditPassword dispatch={dispatch}/>

                    <div className="personal-photo">
                        <Image src={userInfo.staffInfo && userInfo.staffInfo.avatar}/>
                        <SimpleUpload
                            uploadButton={
                                <div className="edit-photo-button">
                                    <FormattedMessage
                                        id='edit'
                                        defaultMessage='Edit'
                                    />
                                </div>}
                            callback={(file) => {
                                this.updateUserPhoto(file)
                            }}
                        />
                    </div>
                </Segment>

                <Segment>
                    <div className="tab-item-header">
                        <FormattedMessage
                            id='additionalInfo'
                            defaultMessage='Additional Info'
                        />
                    </div>
                    <div className="components-item">
                        <TagList tagList={userInfo.tags || []} isSelected={true}/>
                    </div>
                </Segment>
            </div>
        );
    }
}

export default PersonalInfo;