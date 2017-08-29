import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {
    Link
} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const SubMenu = Menu.SubMenu;

class HomeMenu extends Component {

    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Link to="/homePage"/>
                    <Icon type="pie-chart"/>
                    <span>
                        <FormattedMessage
                            id='menuProjects'
                            defaultMessage='Projects'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/homePage/Test1"/>
                    <Icon type="desktop"/>
                    <span>Test1</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="user"/><span>User</span></span>}
                >
                    <Menu.Item key="3"><Link to="/homePage/Test2">Test2</Link></Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="team"/><span>Team</span></span>}
                >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                    <Icon type="file"/>
                    <span>File</span>
                </Menu.Item>
            </Menu>
        );
    }
}

export default HomeMenu;