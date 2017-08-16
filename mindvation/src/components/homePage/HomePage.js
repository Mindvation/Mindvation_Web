import React, {Component} from 'react';
import Menu from './HomeMenu';
import Test1 from '../test/Test1';
import Test2 from '../test/Test2';
import Projects from '../projects/Projects';
import {Grid} from 'semantic-ui-react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Test1/>
    },
    {
        path: '/Test2',
        main: () => <Test2/>
    },
    {
        path: '/Projects',
        main: () => <Projects/>
    },
]

class HomePage extends Component {
    render() {
        return (
            <Router>
                <Grid>
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
                </Grid>
            </Router>
        );
    }
}

export default HomePage;
