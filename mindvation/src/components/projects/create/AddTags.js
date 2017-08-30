import React, {Component} from 'react';
import {Button, Modal, Segment, Header, Input, Popup} from 'semantic-ui-react';
import {isEmpty} from '../../../util/CommUtil';
import TagList from './TagList';
import {FormattedMessage} from 'react-intl';

let createTagNode, allTagsNode, existOption;

const allTags = [{
    key: "T1",
    text: "React Native",
    color: "#7efefe"
}, {
    key: "T2",
    text: "PHP",
    color: "#ff9900"
}, {
    key: "T3",
    text: "Business Canvas",
    color: "#66cc33"
}, {
    key: "T4",
    text: "EPICs",
    color: "#0099cc"
}, {
    key: "T5",
    text: "BI",
    color: "#ffcc00"
}, {
    key: "T6",
    text: "Reactjs",
    color: "#7efefe"
}, {
    key: "T7",
    text: "Java",
    color: "#ff9900"
}, {
    key: "T8",
    text: "AngularJs",
    color: "#0099cc"
}, {
    key: "T9",
    text: "Oracle",
    color: "#ffcc00"
}, {
    key: "T10",
    text: "PM",
    color: "#7efefe"
}];

class AddTags extends Component {
    state = {modalOpen: false, popupOpen: false, allTags: allTags, projectTags: this.props.defaultValue || []};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    getValue = () => {
        return this.state.projectTags;
    };

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    closePopup = () => {
        createTagNode.inputRef.value = "";
        this.setState({popupOpen: false});
    };

    openPopup = () => this.setState({popupOpen: true});

    addTagsToProject = () => {
        this.setState({modalOpen: false, projectTags: allTagsNode.getSelectedTags()});
    };

    addExistTagToProject = () => {
        allTagsNode.selectTag(existOption);
        this.closePopup();
    };

    createTag = () => {
        let tempTags = this.state.allTags;
        let tag = createTagNode.inputRef.value.trim();
        if (!isEmpty(tag)) {
            existOption = this.checkTagExist(tempTags, tag);
            if (existOption) {
                this.openPopup();
            } else {
                let willAddTag = {
                    key: "T" + (tempTags.length + 1),
                    text: tag,
                    color: this.getRandomColor()
                };
                tempTags.push(willAddTag);
                this.setState({
                    allTags: tempTags
                });
                createTagNode.inputRef.value = "";
                allTagsNode.selectTag(willAddTag);
            }

        }
    };

    checkTagExist(options, text) {
        let tempOption = null;
        options.some((option) => {
            if (option.text.toUpperCase() === text.toUpperCase()) {
                tempOption = option;
                return true;
            }
        });
        return tempOption;
    };

    getRandomColor() {
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    }

    updateProjectTags = (tag) => {
        if (this.state.projectTags.indexOf(tag) === -1) {
            let tempTags = this.state.projectTags;
            tempTags.push(tag);
            this.setState({
                projectTags: tempTags
            });
        }
    };

    removeProjectTags = (tag) => {
        let tempTags = this.state.projectTags;
        tempTags.splice(tempTags.indexOf(tag), 1);
        this.setState({
            projectTags: tempTags
        });
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div style={{marginBottom: '10px'}} className="components-length">
                <TagList tagList={this.state.projectTags} handleClick={(tag) => {
                    this.removeProjectTags(tag)
                }}/>
                <Segment>
                    <Header size='small' className="underLine">
                        <FormattedMessage
                            id='selectTagsHeader'
                            defaultMessage='You can select some recommendations as below'
                        />
                    </Header>
                    <TagList
                        tagList={allTags.slice(0, 5)}
                        handleClick={(tag) => {
                            this.updateProjectTags(tag)
                        }}/>
                    <div style={{
                        height: '40px',
                        paddingTop: '13px'
                    }}>
                        <Header style={{cursor: 'pointer'}} size='small' className="underLine" floated='right'
                                onClick={() => this.openModal()}>
                            <FormattedMessage
                                id='moreTags'
                                defaultMessage='More >>'
                            />
                        </Header>
                    </div>
                </Segment>

                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='addTags'
                            defaultMessage='Add Tags'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Segment className="all-tags-segment">
                            <TagList tagList={this.state.allTags}
                                     toggle={true}
                                     selected={this.state.projectTags}
                                     ref={node => {
                                         allTagsNode = node
                                     }}
                            />
                        </Segment>
                        <div style={{position: 'relative'}}>
                            <Input
                                icon='tag'
                                iconPosition='left'
                                label={{
                                    style: {cursor: 'pointer'},
                                    tag: true,
                                    content: <FormattedMessage
                                        id='createTags'
                                        defaultMessage='Create Tags'
                                    />,
                                    color: 'teal',
                                    onClick: () => this.createTag()
                                }}
                                labelPosition='right'
                                placeholder='Enter Tag'
                                ref={node => {
                                    createTagNode = node
                                }}
                            />
                            {this.state.popupOpen ?
                                <div>
                                    <div className="tag-popup">
                                        <Header size='small'>
                                            <FormattedMessage
                                                id='tagExist'
                                                defaultMessage='This tag is exist! Will you add it to this project?'
                                            />
                                        </Header>
                                        <div className="tag-popup-footer">
                                            <Button secondary size='tiny' onClick={() => this.closePopup()}>
                                                <FormattedMessage
                                                    id='no'
                                                    defaultMessage='No'
                                                />
                                            </Button>
                                            <Button primary size='tiny' onClick={() => this.addExistTagToProject()}>
                                                <FormattedMessage
                                                    id='yes'
                                                    defaultMessage='Yes'
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="tag-popup-modal"/>
                                </div> : null}
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button primary onClick={() => this.addTagsToProject()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default AddTags;
