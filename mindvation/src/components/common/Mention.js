import React, {Component} from 'react';
import {Mention, Form} from 'antd';
import PropTypes from 'prop-types';

const {getMentions, toContentState} = Mention;

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
        loading: false,
        initValue: toContentState('')
    };

    fetchSuggestions = (value, callback) => {
        setTimeout(() => {
            callback(webFrameworks);
        }, 500);
    };

    onSearchChange = (value) => {
        this.fetchSuggestions(value, (result) => {
            const searchValue = value.toLowerCase();
            const filtered = result.filter(item =>
                item.name.toLowerCase().indexOf(searchValue) !== -1
            );
            const suggestions = filtered.map(suggestion => (
                <Nav
                    value={suggestion.name}
                    data={suggestion}
                >
                    <span>{suggestion.name} - {suggestion.type}</span>
                </Nav>
            ));

            this.setState({
                suggestions,
                loading: false,
            });
        });
        this.setState({
            loading: true,
        });
    };

    getInfo = () => {
        const {getFieldValue} = this.props.form;
        const mentions = getMentions(getFieldValue('mention'));
        const mentionText = getFieldValue('mention').getPlainText();
        let test = toContentState(mentionText);
        return {
            mentions: mentions,
            text: mentionText
        };
    };

    addMentioned = (mentioned) => {
        const {getFieldValue, setFieldsValue} = this.props.form;
        const mentionText = getFieldValue('mention').getPlainText();
        const mentionedText = mentionText + " @" + mentioned.text + " ";
        const contentText = toContentState(mentionedText);
        setFieldsValue({'mention': contentText});
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {suggestions, loading} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                {getFieldDecorator('mention', {initialValue: this.state.initValue})(
                    <Mention
                        placeholder="@someone"
                        style={{width: '100%', height: 'auto', minHeight: 100, textAlign: 'left'}}
                        suggestions={suggestions}
                        loading={loading}
                        onSearchChange={this.onSearchChange}
                        multiLines
                    />
                )}
            </Form>
        );
    }
}

MVMention.propTypes = {};

MVMention = Form.create()(MVMention);

export default MVMention;
