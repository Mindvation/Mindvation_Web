import React, {Component} from 'react';
import {List} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TagListForMember extends Component {
    state = {order: {}};

    mappingTagOrder(key) {
        let tempOrder = this.state.order;
        if (!tempOrder[key]) {
            Object.assign(tempOrder, {[key]: Object.keys(tempOrder).length + 1})
        } else {
            let orderForKey = tempOrder[key];
            for (let tempKey in tempOrder) {
                if (tempOrder[tempKey] > orderForKey) {
                    tempOrder[tempKey] = tempOrder[tempKey] - 1;
                } else if (tempOrder[tempKey] === orderForKey) {
                    delete tempOrder[key];
                }
            }
        }
        this.setState({
            order: tempOrder
        })
    }

    getTagOrder() {
        return this.state.order;
    }

    render() {
        const {tagList, shortTag} = this.props;
        return (
            tagList.length === 0 ? null : <List horizontal className="member-tag-list">
                {tagList.map((tag) => {
                    return <List.Item key={tag.id} style={{position: 'relative'}}>
                        <div
                            className={"tag-selected tag-style tag-style-" + (tag.tagStyle || 'default')}
                            onClick={() => {
                                return shortTag ? {} : this.mappingTagOrder(tag.id);
                            }}>
                            {shortTag ? tag.name.substr(0, 1) : tag.name}
                        </div>
                        {this.state.order[tag.id] && !shortTag ? <div className="tag-footer">
                            <div className="tag-footer-text">{this.state.order[tag.id]}</div>
                        </div> : null}
                    </List.Item>
                })}
            </List>
        );
    }
}

TagListForMember.propTypes = {
    tagList: PropTypes.array,
    shortTag: PropTypes.bool
};

export default TagListForMember;