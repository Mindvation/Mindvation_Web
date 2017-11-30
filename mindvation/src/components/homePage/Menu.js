import React, {Component} from 'react';
import {Menu} from 'antd';
import {
    Link
} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import createHistory from 'history/createBrowserHistory';
import Image from '../common/Image';

const SubMenu = Menu.SubMenu;
const keyPathMapping = [
    {
        "key": '1',
        "path": '/home/projects'
    },
    {
        "key": '1',
        "path": '/home/requirement'
    },
    {
        "key": '1',
        "path": '/home/story'
    },
    {
        "key": '1',
        "path": '/home/MVPDashboard'
    },
    {
        "key": '1',
        "path": '/home/MyMVPDashboard'
    },
    {
        "key": '2',
        "path": '/home/CreateModel',
        "hostKey": "sub2"
    },
    {
        "key": '3',
        "path": '/home/Employee',
        "hostKey": "sub1"
    },
    {
        "key": '4',
        "path": '/home/Department',
        "hostKey": "sub1"
    },
    {
        "key": '5',
        "path": '/home/ModelList',
        "hostKey": "sub2"
    },
    {
        "key": '6',
        "path": '/home/MyModelList',
        "hostKey": "sub2"
    },
    {
        "key": '7',
        "path": '/home/PersonalInfo'
    }
];

let defaultKey = '1', hostKey;

class HomeMenu extends Component {

    componentWillMount() {
        this.resetMenu();
    }

    componentWillUpdate() {
        this.resetMenu();
    }

    resetMenu = () => {
        const history = createHistory();
        const location = history.location;
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
    };

    render() {
        return (
            <Menu theme="dark" selectedKeys={[defaultKey]}
                  defaultOpenKeys={[hostKey]}
                  mode="inline">
                <Menu.Item key="1" className="menu_text">
                    <Link to="/home/projects"/>
                    <Image name="menu_project"/>
                    <span>
                        <FormattedMessage
                            id='menuProjects'
                            defaultMessage='Projects'
                        />
                    </span>
                </Menu.Item>
                <SubMenu
                    key="sub2"
                    title={<span className="menu_icon_text"><Image name="menu_model"/><span>
                        <FormattedMessage
                            id='model'
                            defaultMessage='Template'
                        />
                    </span></span>}
                >
                    <Menu.Item key="2"><Link to="/home/CreateModel">
                        <FormattedMessage
                            id='createModel'
                            defaultMessage='Create Template'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/home/ModelList">
                        <FormattedMessage
                            id='modelsAndTemplates'
                            defaultMessage='Template'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/home/MyModelList">
                        <FormattedMessage
                            id='myModels'
                            defaultMessage='My Template'
                        />
                    </Link></Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub1"
                    title={<span className="menu_icon_text"><Image name="menu_hr"/><span>
                        <FormattedMessage
                            id='hr'
                            defaultMessage='HR'
                        />
                    </span></span>}
                >
                    <Menu.Item key="3"><Link to="/home/Employee">
                        <FormattedMessage
                            id='employee'
                            defaultMessage='Employee'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/home/Department">
                        <FormattedMessage
                            id='department'
                            defaultMessage='Department'
                        />
                    </Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="7" className="menu_icon_text">
                    <Link to="/home/PersonalInfo"/>
                    <Image name="menu_personal"/>
                    <span>
                        <FormattedMessage
                            id='personalInfo'
                            defaultMessage='Personal Info'
                        />
                    </span>
                </Menu.Item>
                {/*<SubMenu
                    key="sub2"
                    title={<span><Icon type="team"/><span>Team</span></span>}
                >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                    <Icon type="file"/>
                    <span>File</span>
                </Menu.Item>*/}
            </Menu>
        );
    }
}

export default HomeMenu;