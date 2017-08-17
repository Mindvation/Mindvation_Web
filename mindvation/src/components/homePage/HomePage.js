import React, {Component} from 'react';
import Menu from './HomeMenu';
import Test1 from '../test/Test1';
import Test2 from '../test/Test2';
import Projects from '../../containers/project_container';
import {logOut} from '../../actions/logon_action';
import {Grid, Header, Button} from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

const routes = [
    {
        path: '/homePage',
        exact: true,
        main: () => <Projects/>
    },
    {
        path: '/homePage/Test2',
        main: () => <Test2/>
    },
    {
        path: '/homePage/Test1',
        main: () => <Test1/>
    },
];

class HomePage extends Component {
    userLogOut() {
        this.props.dispatch(logOut());
        this.props.history.push('/');
    }

    render() {
        /*if (!this.props.userInfo.message) {
            let redirect = this.props.location.pathname + this.props.location.search;
            this.props.history.push('/login?message=login&redirect_uri=' + encodeURIComponent(redirect));
        }*/
        return (
            <Router>
                <Grid style={{padding: '15px'}}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header as='h2' textAlign='center'>
                                Mindvation
                                <Button floated='right' onClick={() => this.userLogOut()}>Log out</Button>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Menu/>
                        </Grid.Column>

                        <Grid.Column stretched width={14}>
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
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Router>
        );
    }
}

export default HomePage;
