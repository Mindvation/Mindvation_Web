import React, {Component} from 'react';
import {Button, Modal, Segment, Header, Input} from 'semantic-ui-react';
import {isEmpty, getRandomStyle,getRandomColor} from '../../../util/CommUtil';
import TagList from './TagList';
import {FormattedMessage} from 'react-intl';
import {retrieveTags, createTag as createTagAction} from '../../../actions/tags_action';
import _ from 'lodash';
import {getStaffId} from '../../../util/UserStore';
import Image from '../../common/Image';

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
        const allTags = allTagsNode.getSelectedTags();
        this.setState({modalOpen: false, projectTags: allTags});
        if (this.props.onChange) {
            this.props.onChange(allTags)
        }
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
                    creatorId: getStaffId(),
                    tagStyle: getRandomStyle(),
                    color: getRandomColor()
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

            if (this.props.onChange) {
                this.props.onChange(tempTags)
            }
        }
    };

    removeProjectTags = (tag) => {
        let tempTags = this.state.projectTags;
        let index = this.getTagIndex(tempTags, tag);
        tempTags.splice(index, 1);
        this.setState({
            projectTags: tempTags
        });
        if (this.props.onChange) {
            this.props.onChange(tempTags)
        }
    };

    render() {
        let props = {
            ...this.props
        };
        const {modalOpen, projectTags} = this.state;
        const {allTags} = this.props;
        if (this.props.withRef) {
            props.ref = this.setWrappedInstance;
        }
        return (
            <div style={{marginBottom: '10px'}} className="input-content">
                <Segment className="select-tag-segment">
                    <TagList className="selected-tag-list"
                             isSelected={true}
                             tagList={projectTags} handleClick={(tag) => {
                        this.removeProjectTags(tag)
                    }}/>
                    {projectTags.length > 0 ? <div className="tag-divider"/> : null}
                    <div className="select-tag-text">
                        <FormattedMessage
                            id='selectTagsHeader'
                            defaultMessage='You can select some recommendations as below'
                        />
                    </div>
                    <TagList
                        className="all-tag-list"
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
                    <Modal.Header className="modal-title-border">
                        <Image name="tag"/>
                        <FormattedMessage
                            id='addTags'
                            defaultMessage='Add Tags'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <div className="all-tags-segment">
                            <TagList
                                className="all-tag-list"
                                tagList={this.props.allTags}
                                toggle={true}
                                selected={projectTags}
                                ref={node => {
                                    allTagsNode = node
                                }}
                            />
                        </div>
                        <div className="add-tag">
                            <Input
                                action={{
                                    className: "add-tag-button",
                                    content: <FormattedMessage
                                        id='createTags'
                                        defaultMessage='Create Tags'
                                    />,
                                    onClick: () => this.createTag()
                                }}
                                labelPosition='right'
                                placeholder='Enter Tag'
                                ref={node => {
                                    createTagNode = node
                                }}
                                className="add-tag-input"
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
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.addTagsToProject()}>
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
