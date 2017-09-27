import React, {Component} from 'react';
import HomePage from './containers/home_container';
import LoginPage from './containers/logon_container';
import {
    Router,
    Route,
    Redirect
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
                    <Route exact path="/" render={() => (
                        <Redirect to="/login"/>
                    )}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                </div>
            </Router>
        );
    }
}

export default App;
