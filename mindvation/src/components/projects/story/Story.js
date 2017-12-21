import React, {Component} from 'react';
import StoryList from '../../../containers/stories_container';
import CreateStory from '../../../containers/createStory_container';
import {FormattedMessage} from 'react-intl';
import Image from '../../common/Image';

class Story extends Component {
    render() {
        return (
            <div className="requirement-segment">
                <div className="tab-item-header">
                    <Image name="story"/>
                    <FormattedMessage
                        id='storyList'
                        defaultMessage='Story List'
                    />
                </div>
                <CreateStory/>
                <StoryList/>
            </div>
        );
    }
}

export default Story;
