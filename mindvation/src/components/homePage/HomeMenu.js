import React, {Component} from 'react';
import {Grid, Menu, Segment} from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';



class HomeMenu extends Component {
    state = {activeItem: 'search'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        return (
            <Menu vertical>
                <Menu.Item name='Projects' active={activeItem === 'Projects'}>
                    <Link to="/Projects">Projects</Link>
                </Menu.Item>

                <Menu.Item>
                    Project
                    <Menu.Menu>
                        <Menu.Item name='Test1' active={activeItem === 'Test1'}
                                   onClick={this.handleItemClick}>
                            <Link to="/">Test1</Link>
                        </Menu.Item>
                        <Menu.Item name='Test2' active={activeItem === 'Test2'}
                                   onClick={this.handleItemClick}>
                            <Link to="/Test2">Test2</Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    SN:Group
                </Menu.Item>
            </Menu>

        );
    }
}

export default HomeMenu;
