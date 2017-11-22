import React, {Component} from 'react';
import {Segment, Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import MVImage from '../common/Image';
import SimpleUpload from '../common/SimpleUpload';
import EditPassword from './EditPassword';

class PersonalInfo extends Component {

    updateUserPhoto = (file) => {
        console.info(file);
    };

    render() {
        const {userInfo} = this.props;
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
                            2222222
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
                            2222222
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
                            2222222
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
                            2222222
                        </div>
                    </div>

                    <EditPassword/>

                    <div className="personal-photo">
                        <Image src={require('../../res/image/photo.jpg')}/>
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
                </Segment>

            </div>
        );
    }
}

export default PersonalInfo;