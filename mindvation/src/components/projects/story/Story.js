import React, {Component} from 'react';
import StoryList from '../../../containers/stories_container';
import CreateStory from '../../../containers/createStory_container';
import {Header, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';

class Story extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="requirement-segment">
                <div className="tab-item-header">
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
