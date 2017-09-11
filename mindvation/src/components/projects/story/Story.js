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
                <Header as='h3'>
                    <Icon name='database'/>
                    <Header.Content className={"project-title underLine"}>
                        <FormattedMessage
                            id='storyList'
                            defaultMessage='Story List'
                        />
                    </Header.Content>
                </Header>
                <StoryList/>
                <CreateStory/>
            </div>
        );
    }
}

export default Story;
