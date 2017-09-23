import React, {Component} from 'react';
import Menu from './Menu';
import CreateModel from '../model/CreateModel';
import Dashboard from '../projects/MVPPlan/Dashboard';
import MyDashboard from '../projects/MVPPlan/MyDashboard';
import ProjectDetail from '../../containers/projectDetail_container';
import RequirementDetail from '../../containers/requirementDetail_container';
import StoryDetail from '../../containers/storyDetail_container';
import CommonHeader from '../../containers/header_container';
import Projects from '../../containers/project_container';
import {Layout, BackTop} from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Redirect
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
        path: '/home/MVPDashboard',
        main: () => <Dashboard/>
    },
    {
        path: '/home/Test2',
        main: () => <MyDashboard/>
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
            <Router>
                <Layout>
                    <Header style={{paddingTop: '17px'}}><CommonHeader history={this.props.history}/></Header>
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
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default HomePage;
