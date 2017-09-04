import React, {Component} from 'react';
import RequirementList from '../../../containers/requirements_container';
import CreateRequirement from '../../../containers/requirement_container';
import {Header, Icon} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Comment from '../../common/Comment';

class Requirement extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="requirement-segment">
                <Header as='h3'>
                    <Icon name='file text outline'/>
                    <Header.Content className={"project-title underLine"}>
                        <FormattedMessage
                            id='requirements'
                            defaultMessage='Requirements'
                        />
                    </Header.Content>
                </Header>
                <RequirementList/>
                <CreateRequirement/>
                <Comment/>
            </div>
        );
    }
}

export default Requirement;
