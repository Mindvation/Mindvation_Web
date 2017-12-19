import React, {Component} from 'react';
import {Mention, Form} from 'antd';
import {Image} from 'semantic-ui-react';
import {retrieveStaff} from '../../util/Service';
import {isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

const {getMentions, toContentState} = Mention;

const webFrameworks = [
    {name: 'Bob', type: 'FE', icon: require('../../res/image/photo.jpg'), id: "1"},
    {name: 'Frank', type: 'BA', icon: require('../../res/image/photo.jpg'), id: "2"},
    {name: 'Darcy', type: 'PM', icon: require('../../res/image/photo.jpg'), id: "3"},
    {name: 'Migun', type: 'BE', icon: require('../../res/image/photo.jpg'), id: "4"}
];

class MVMention extends Component {
    constructor() {
        super();
        this.mentionedStaffs = [];
        this.state = {
            suggestions: [],
            loading: false,
            initValue: toContentState(''),
            reply: null
        };
    }

    componentDidMount() {
        //this.mentionRefNode.focus();
    }

    fetchSuggestions = (value, callback) => {
        /**/
        retrieveStaff((staffs) => {
            callback(staffs);
        });
    };

    onSearchChange = (value) => {
        this.fetchSuggestions(value, (result) => {
            const searchValue = value.toLowerCase();
            const filtered = result.filter(item =>
                item.text.toLowerCase().indexOf(searchValue) !== -1
            );
            const suggestions = filtered.map(suggestion => (
                <Mention.Nav
                    value={suggestion.text}
                    data={suggestion}
                >
                    <div className="display-flex">
                        <Image verticalAlign="middle" src={suggestion.image.src} avatar
                               className="header-avatar"/>
                        <span>{suggestion.text}</span>
                    </div>
                </Mention.Nav>
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
        const validMentions = this.getValidMentions(mentions);
        return {
            mentions: validMentions,
            text: mentionText,
            reply: this.state.reply
        };
    };

    getValidMentions = (mentions) => {
        let returnMentions = [];
        if (this.mentionedStaffs && this.mentionedStaffs.length > 0) {
            mentions.map((item) => {
                this.mentionedStaffs.some((staff) => {
                    if (item.substr(1) === staff.text && returnMentions.indexOf(staff) === -1) {
                        returnMentions.push(staff);
                        return true;
                    }
                })
            })
        }
        return returnMentions;
    };

    addMentioned = (replyComment) => {
        /*const {getFieldValue, setFieldsValue} = this.props.form;
        const mentionText = getFieldValue('mention').getPlainText();
        const mentionedText = mentionText + (isEmpty(mentionText) ? "@" : " @") + mentioned.text + " ";
        const contentText = toContentState(mentionedText);
        setFieldsValue({'mention': contentText});
        this.mentionedStaffs.push(mentioned);*/
        this.setState({
            reply: replyComment
        })
    };

    setSelected = (value, data) => {
        this.mentionedStaffs.push(data);
    };

    handleReset = () => {
        this.props.form.resetFields();
        this.mentionedStaffs = [];
        this.setState({
            reply: null
        })
    };

    render() {
        const {suggestions, loading, initValue, reply} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                {
                    reply ? <div className="mention-reply">
                        <FormattedMessage
                            id='reply'
                            defaultMessage='Reply'
                        />: {reply.author.text}</div> : null
                }
                {getFieldDecorator('mention', {initialValue: initValue})(
                    <Mention
                        style={{width: '100%', height: 'auto', minHeight: 100, textAlign: 'left'}}
                        suggestions={suggestions}
                        loading={loading}
                        onSearchChange={this.onSearchChange}
                        onSelect={(value, data) => this.setSelected(value, data)}
                        multiLines
                        ref={node => this.mentionRefNode = node}
                    />
                )}
            </Form>
        );
    }
}

MVMention = Form.create()(MVMention);

export default MVMention;
