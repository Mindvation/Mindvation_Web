import React, {Component} from 'react';
import HomePage from './containers/home_container';
import LoginPage from './containers/logon_container';
import NoMatch from './components/common/NoMatch';
import {
    Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {
    assignOptions,
    contingencyOptions,
    priorityOptions,
    statusOptions,
    softModelOptions,
    businessModelOptions,
    engineeringModelOptions,
    techniqueModelOptions,
    functionOptions
} from "./res/data/dummyData";
import {updateGlobalData} from './util/CommUtil';

const history = createHistory();

class App extends Component {
    constructor() {
        super();
        updateGlobalData("dummyData", {
            assignOptions: assignOptions,
            contingencyOptions: contingencyOptions,
            priorityOptions: priorityOptions,
            statusOptions: statusOptions,
            softModelOptions: softModelOptions,
            businessModelOptions: businessModelOptions,
            engineeringModelOptions: engineeringModelOptions,
            techniqueModelOptions: techniqueModelOptions,
            functionOptions: functionOptions
        });
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Redirect to="/login"/>
                        )}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/home" component={HomePage}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
