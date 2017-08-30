import React, {Component} from 'react';
import {Header, Icon, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {isEmpty, getOption} from '../../util/CommUtil';

class ReadOnly extends Component {

    displayValue = (value, hasSubItem, options) => {
        if (isEmpty(value)) {
            if (!hasSubItem) {
                return "N/A";
            }
        } else {
            if (options) {
                if (Array.isArray(value)) {
                    return value.map((result, i) => {
                        let option = getOption(options, result);
                        return <div key={i}>
                            {option.image ?
                                <div className="read-only-text-item">
                                    <Image src={option.image.src} avatar/>
                                    <span>{isEmpty(option.text) ? result : option.text}</span>
                                </div> :
                                <span>{isEmpty(option.text) ? result : option.text}</span>}
                        </div>
                    })
                } else {
                    let option = getOption(options, value);
                    return option.image ?
                        <div>
                            <Image src={option.image.src} avatar/>
                            <span>{isEmpty(option.text) ? value : option.text}</span>
                        </div> :
                        <span>{isEmpty(option.text) ? value : option.text}</span>;
                }
            } else {
                if (Array.isArray(value)) {
                    return value.map((result, i) => {
                        return <div key={i}>{result}</div>
                    })
                }
            }
        }

        return value;
    };

    render() {
        const {value, icon, title, hasSubItem, isSubItem, options} = this.props;
        return (
            <div className={"components-item" + " " + (isSubItem ? "read-only-sub-item" : "")}>
                <Header as={isSubItem ? 'h5' : 'h4'}>
                    {icon ? <Icon name={icon} className="read-only-title"/> : null}
                    <Header.Content className="read-only-title">
                        <FormattedMessage
                            id={title}
                        />
                    </Header.Content>
                </Header>
                <div className="read-only-text">
                    {this.displayValue(value, hasSubItem, options)}
                </div>
            </div>
        );
    }
}

ReadOnly.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    hasSubItem: PropTypes.bool,
    isSubItem: PropTypes.bool,
    options: PropTypes.array
};

export default ReadOnly;
