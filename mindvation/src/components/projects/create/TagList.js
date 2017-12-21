import React, {Component} from 'react';
import {List} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TagList extends Component {
    state = {
        selectedTags: Object.assign([], this.props.selected)
    };

    getSelectedTags() {
        return this.state.selectedTags;
    }

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

    selectTag(tag) {
        const {singleSelect} = this.props;
        let tempTags = this.state.selectedTags;
        if (this.getTagIndex(tempTags, tag) === -1) {
            if (singleSelect) {
                tempTags = [tag];
            } else {
                tempTags.push(tag);
            }
            this.setState({
                selectedTags: tempTags
            })
        }
    }

    toggleTag(tag) {
        const {singleSelect} = this.props;
        let tempTags = this.state.selectedTags;
        let index = this.getTagIndex(tempTags, tag);
        if (index > -1) {
            tempTags.splice(index, 1);
        } else {
            if (singleSelect) {
                tempTags = [tag];
            } else {
                tempTags.push(tag);
            }
        }
        this.setState({
            selectedTags: tempTags
        })
    }

    checkTagStatus(tags, tag) {
        let flag = false;
        tags.some((item) => {
            if (item.tagId === tag.tagId) {
                flag = true;
                return true;
            }
        });
        return flag;
    }

    render() {
        const {tagList, handleClick, toggle, className, isSelected} = this.props;
        const {selectedTags} = this.state;
        return (
            tagList.length === 0 ? null : <List horizontal className={className}>
                {tagList.map((tag, i) => {
                    return <List.Item key={i} style={{position: 'relative'}}>
                        <div
                            className={((toggle && this.checkTagStatus(selectedTags, tag) || isSelected) ? "tag-selected " : "")
                            + "tag-style tag-style-" + (tag.tagStyle || 'default')}
                            onClick={() => {
                                toggle ? this.toggleTag(tag) : (handleClick ? handleClick(tag) : () => {
                                })
                            }}>
                            {tag.name}
                        </div>
                    </List.Item>
                })}
            </List>
        );
    }
}

TagList.propTypes = {
    tagList: PropTypes.array,
    handleClick: PropTypes.func,
    toggle: PropTypes.bool,
    selected: PropTypes.array,
    className: PropTypes.string,
    isSelected: PropTypes.bool,
    singleSelect: PropTypes.bool
};

export default TagList;
