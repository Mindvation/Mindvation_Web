import React, {Component} from 'react';
import Menu from './Menu';
import Test1 from '../test/Test1';
import Test2 from '../test/Test2';
import ProjectDetail from '../../containers/projectDetail_container';
import CommonHeader from '../../containers/header_container';
import Projects from '../../containers/project_container';
import {Layout} from 'antd';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './HomePage.css';

const {Header, Content, Sider} = Layout;

const routes = [
    {
        path: '/projects',
        exact: true,
        main: () => <Projects/>
    },
    {
        path: '/Test2',
        main: () => <Test2/>
    },
    {
        path: '/Test1',
        main: () => <Test1/>
    },
    {
        path: '/projects/:id',
        exact: true,
        main: ProjectDetail
    }
];

class HomePage extends Component {
    state = {
        collapsed: false,
        minHeight: '0px'
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
        let interval = setInterval(() => {
            let e = document.createEvent("Event");
            e.initEvent("resize", true, true);
            window.dispatchEvent(e);
            interval && clearInterval(interval);
        }, 250)
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
        console.info(111111111)
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
