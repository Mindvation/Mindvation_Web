import React, {Component} from 'react';
import Menu from './Menu';
import CreateModel from '../model/createModel/CreateModel';
import Dashboard from '../projects/MVPPlan/Dashboard';
import MyDashboard from '../projects/MVPPlan/MyDashboard';
import Employee from '../../containers/employee_container';
import Department from '../../containers/department_container';
import ProjectDetail from '../../containers/projectDetail_container';
import RequirementDetail from '../../containers/requirementDetail_container';
import StoryDetail from '../../containers/storyDetail_container';
import CommonHeader from '../../containers/header_container';
import Projects from '../../containers/project_container';
import ModelList from '../model/Models/ModelList';
import MyModelList from '../model/myModels/MyModelList';

import {Layout, BackTop} from 'antd';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import './HomePage.css';

const {Header, Content, Sider} = Layout;

const routes = [
    {
        path: '/home/projects',
        exact: true,
        main: () => <Projects/>
    },
    {
        path: '/home/MVPDashboard/:id',
        main: Dashboard
    },
    {
        path: '/home/MyMVPDashboard/:id',
        main: MyDashboard
    },
    {
        path: '/home/CreateModel',
        main: () => <CreateModel/>
    },
    {
        path: '/home/projects/:id',
        main: ProjectDetail
    },
    {
        path: '/home/requirement/:id',
        main: RequirementDetail
    },
    {
        path: '/home/story/:id',
        main: StoryDetail
    },
    {
        path: '/home/Employee',
        main: Employee
    },
    {
        path: '/home/Department',
        main: Department
    },
    {
        path: '/home/ModelList',
        main: ModelList
    },
    {
        path: '/home/MyModelList',
        main: MyModelList
    }
];

class HomePage extends Component {
    state = {
        collapsed: false,
        minHeight: '0px'
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
        let e = document.createEvent("Event");
        e.initEvent("resize", true, true);
        window.dispatchEvent(e);
    };

    componentWillMount() {
        this.setHeight();
        window.addEventListener('resize', this.setHeight, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setHeight);
    }

    setHeight = () => {
        const h = document.documentElement.clientHeight;//可见区域高度
        const minHeight = (h - 64) + "px";
        this.setState({
            minHeight: minHeight
        });
    };

    render() {
        return (
            <Layout>
                <Header style={{paddingTop: '17px'}}><CommonHeader/></Header>
                <Layout>
                    <Sider collapsible
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}
                           className="sider-menu"
                    >
                        <Menu/>
                    </Sider>
                    <Content style={{minHeight: this.state.minHeight, overflowY: 'hidden'}}>
                        <BackTop/>
                        <Switch>
                            <Route exact path="/home" render={() => (
                                <Redirect to="/home/projects"/>
                            )}/>
                            {routes.map((route, index) => (
                                // Render more <Route>s with the same paths as
                                // above, but different components this time.
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.main}
                                />
                            ))}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>

        );
    }
}

export default HomePage;
