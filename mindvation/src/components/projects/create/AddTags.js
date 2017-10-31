import React, {Component} from 'react';
import {Button, Modal, Segment, Header, Input} from 'semantic-ui-react';
import {isEmpty, getRandomColor} from '../../../util/CommUtil';
import TagList from './TagList';
import {FormattedMessage} from 'react-intl';
import {retrieveTags, createTag as createTagAction} from '../../../actions/tags_action';
import _ from 'lodash';
import {getStaffId} from '../../../util/UserStore';

let createTagNode, allTagsNode, existOption;

class AddTags extends Component {
    state = {
        modalOpen: false,
        popupOpen: false,
        projectTags: this.props.defaultValue ? _.cloneDeep(this.props.defaultValue) : []
    };

    componentWillMount() {
        this.props.dispatch(retrieveTags())
    }

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

    getWrappedInstance = () => {
        if (this.props.widthRef) {
            return this.wrappedInstance;
        }
    };

    setWrappedInstance = (ref) => {
        this.wrappedInstance = ref;
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
        let tempTags = this.props.allTags;
        let tag = createTagNode.inputRef.value.trim();
        if (!isEmpty(tag)) {
            existOption = this.checkTagExist(tempTags, tag);
            if (existOption) {
                this.openPopup();
            } else {
                /*let willAddTag = {
                    tagId: "T" + (tempTags.length + 1),
                    name: tag,
                    color: getRandomColor()
                };
                tempTags.push(willAddTag);
                /!*this.setState({
                    allTags: tempTags
                });*!/*/

                this.props.dispatch(createTagAction({
                    name: tag,
                    color: getRandomColor(),
                    "creatorId": getStaffId()
                }, function (res) {
                    createTagNode.inputRef.value = "";
                    allTagsNode.selectTag(res);
                }.bind(this)));
            }
        }
    };

    checkTagExist(options, name) {
        let tempOption = null;
        options.some((option) => {
            if (option.name.toUpperCase() === name.toUpperCase()) {
                tempOption = option;
                return true;
            }
        });
        return tempOption;
    };

    getTagIndex = (tagArr, tag) => {
        let index = -1;
        tagArr.some((item, i) => {
            if (item.tagId === tag.tagId) {
                index = i;
                return true;
            }
        });
        return index;
    };

    updateProjectTags = (tag) => {
        if (this.getTagIndex(this.state.projectTags, tag) === -1) {
            let tempTags = this.state.projectTags;
            tempTags.push(tag);
            this.setState({
                projectTags: tempTags
            });
        }
    };

    removeProjectTags = (tag) => {
        let tempTags = this.state.projectTags;
        let index = this.getTagIndex(tempTags, tag);
        tempTags.splice(index, 1);
        this.setState({
            projectTags: tempTags
        });
    };

    render() {
        let props = {
            ...this.props
        };
        const {modalOpen} = this.state;
        const {allTags} = this.props;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
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
                        tagList={allTags.slice(0, 6)}
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
                            <TagList tagList={this.props.allTags}
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
