import React, {Component} from 'react';
import {Button, List, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TagList extends Component {
    state = {
        selectedTags: Object.assign([], this.props.selected)
    };

    getSelectedTags() {
        return this.state.selectedTags;
    }

    selectTag(tag) {
        let tempTags = this.state.selectedTags;
        if (tempTags.indexOf(tag) === -1) {
            tempTags.push(tag);
            this.setState({
                selectedTags: tempTags
            })
        }
    }

    toggleTag(tag) {
        let tempTags = this.state.selectedTags;
        if (tempTags.indexOf(tag) > -1) {
            tempTags.splice(tempTags.indexOf(tag), 1);
        } else {
            tempTags.push(tag);
        }
        this.setState({
            selectedTags: tempTags
        })
    }

    render() {
        const {tagList, handleClick, toggle} = this.props;
        return (
            tagList.length === 0 ? null : <List horizontal>
                {tagList.map((tag) => {
                    return <List.Item key={tag.key} style={{position: 'relative'}}>
                        {toggle && this.state.selectedTags.indexOf(tag) > -1 ?
                            <Icon name="check circle outline" color="green" size="large"
                                  className="tags-icon"
                            /> : null}
                        <Button size="mini" style={{backgroundColor: tag.color}} onClick={() => {
                            toggle ? this.toggleTag(tag) : (handleClick ? handleClick(tag) : () => {
                            })
                        }}>
                            {tag.text}
                        </Button>
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
    selected: PropTypes.array
};

export default TagList;
