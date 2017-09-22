import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {
    Link
} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const location = history.location;
const SubMenu = Menu.SubMenu;
const keyPathMapping = [
    {
        "key": '1',
        "path": '/home/projects'
    },
    {
        "key": '2',
        "path": '/home/CreateModel'
    },
    {
        "key": '3',
        "path": '/home/Test2',
        "hostKey": "sub1"
    }];

let defaultKey = '1', hostKey;

class HomeMenu extends Component {

    componentWillMount() {
        if (!location.pathname) {
            return;
        }
        keyPathMapping.some((keyPath) => {
            if (location.pathname.indexOf(keyPath.path) > -1) {
                defaultKey = keyPath.key;
                hostKey = keyPath.hostKey;
                return true;
            }
        });
    }

    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={[defaultKey]}
                  defaultOpenKeys={[hostKey]}
                  mode="inline">
                <Menu.Item key="1">
                    <Link to="/home/projects"/>
                    <Icon type="pie-chart"/>
                    <span>
                        <FormattedMessage
                            id='menuProjects'
                            defaultMessage='Projects'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/home/CreateModel"/>
                    <Icon type="desktop"/>
                    <span>创建模板</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="user"/><span>User</span></span>}
                >
                    <Menu.Item key="3"><Link to="/home/Test2">Test2</Link></Menu.Item>
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