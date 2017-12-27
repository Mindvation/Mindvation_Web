import React, {Component} from 'react';
import RequirementList from '../../../containers/requirements_container';
import CreateRequirement from '../../../containers/requirement_container';
import {FormattedMessage} from 'react-intl';

class Requirement extends Component {

    render() {
        return (
            <div className="requirement-segment">
                <div className="tab-item-header">
                    <FormattedMessage
                        id='requirements'
                        defaultMessage='Requirements'
                    />
                </div>
                <CreateRequirement/>
                <RequirementList projectId={this.props.projectId}/>
            </div>
        );
    }
}

export default Requirement;
