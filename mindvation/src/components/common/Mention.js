import React, {Component} from 'react';
import {Mention} from 'antd';
import PropTypes from 'prop-types';

const Nav = Mention.Nav;

const webFrameworks = [
    {name: 'Bob', type: 'FE', icon: require('../../res/image/photo.jpg')},
    {name: 'Frank', type: 'BA', icon: require('../../res/image/photo.jpg')},
    {name: 'Darcy', type: 'PM', icon: require('../../res/image/photo.jpg')},
    {name: 'Migun', type: 'BE', icon: require('../../res/image/photo.jpg')}
];

class MVMention extends Component {

    state = {
        suggestions: [],
    };

    onSearchChange = (value) => {
        const searchValue = value.toLowerCase();
        const filtered = webFrameworks.filter(item =>
            item.name.toLowerCase().indexOf(searchValue) !== -1
        );
        const suggestions = filtered.map(suggestion => (
            <Nav
                value={suggestion.name}
                data={suggestion}
                disabled={suggestion.disabled}
            >
        <span>
          <img alt={suggestion.name} style={{height: 16, width: 16, marginRight: 5, float: 'left'}}
               src={suggestion.icon}/>
            {suggestion.name} - {suggestion.type}
        </span>
            </Nav>
        ));
        this.setState({suggestions});
    };

    render() {
        const {suggestions} = this.state;
        return (
            <Mention
                style={{width: '100%', height: 'auto', minHeight: 100}}
                suggestions={suggestions}
                onSearchChange={this.onSearchChange}
                multiLines
            />
        );
    }
}

MVMention.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.string
};

export default MVMention;
