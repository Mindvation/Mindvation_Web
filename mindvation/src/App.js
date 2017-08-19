import React, {Component} from 'react';
import HomePage from './containers/home_container';
import LoginPage from './containers/logon_container';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

class App extends Component {
    render() {
        return (
            <Router history={createHistory()}>
                <div>
                    <Route exact path="/" render={() => (
                        <Redirect to="/login"/>
                    )}/>
                    <Route path="/homePage" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                </div>
            </Router>
        );
    }
}

export default App;
