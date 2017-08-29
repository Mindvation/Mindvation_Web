import React, {Component} from 'react';
import {Header, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

class ReadOnly extends Component {

    render() {
        const {value, icon, title} = this.props;
        return (
            <div className="components-item">
                <Header as='h4'>
                    {icon ? <Icon name={icon} className="read-only-title"/> : null}
                    <Header.Content className="read-only-title">
                        <FormattedMessage
                            id={title}
                        />
                    </Header.Content>
                </Header>
                <div className="read-only-text">
                    {value}
                </div>
            </div>
        );
    }
}

ReadOnly.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.string
};

export default ReadOnly;
