import React, {Component} from 'react';
import HomePage from './containers/home_container';
import LoginPage from './containers/logon_container';
import {
    BrowserRouter as Router,
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
import {updateGobalData} from './util/CommUtil';

class App extends Component {
    constructor() {
        super();
        updateGobalData("dummyData", {
            assignOptions: assignOptions,
            contingencyOptions: contingencyOptions,
            priorityOptions: priorityOptions,
            statusOptions: statusOptions,
            softModelOptions: softModelOptions,
            businessModelOptions: businessModelOptions,
            engineeringModelOptions: engineeringModelOptions,
            techniqueModelOptions: techniqueModelOptions,
            functionOptions: functionOptions
        })
    }

    render() {
        return (
            <Router history={createHistory()}>
                <div>
                    <Route exact path="/" render={() => (
                        <Redirect to="/login"/>
                    )}/>
                    <Route path="/projects" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                </div>
            </Router>
        );
    }
}

export default App;
