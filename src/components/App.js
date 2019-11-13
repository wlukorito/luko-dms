import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

import './App.css';

import SideMenu from './SideMenu';
import Navbar from './Navbar';
import Login from './Login';
import Users from './users/Users';
import Profile from './users/Profile';
import FileUploadForm from './uploads/FileUploadForm';
import Uploads from './uploads/Uploads';
import Finished from './uploads/Finished';
import Settings from './Settings';
import Documentation from './Documentation';

const App = props => {
    const [isToggled, setIsToggled] = useState(false);

    if (props.auth.isSignedIn) {
        return (
            <div className="wraper ">
                <SideMenu isToggled={isToggled} />
                <div id="content" className={isToggled ? 'active' : ''}>
                    <Navbar setIsToggled={setIsToggled} isToggled={isToggled} />
                    {/* load default component here */}
                    <Switch>
                        {/* <Route exact path="/" render={() => <h6>Welcome</h6>} /> */}
                        <Route exact path="/" component={Profile} />
                        <Route path="/users" component={Users} />
                        <Route path="/uploads" component={Uploads} />
                        <Route path="/finished" component={Finished} />
                        <Route path="/upload" component={FileUploadForm} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/documentation" component={Documentation} />
                        <Route path="/:any" render={() => <h6>NOT FOUND</h6>} />
                    </Switch>
                </div>
            </div>
        );
    }
    return (
        <div className="container p-5">
            <Route path="/" exact component={props => <Login {...props} />} />
            <Route
                path="/:any"
                render={props => <Redirect to={{ pathname: '/', state: { from: props.match.location } }} />}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(
    mapStateToProps,
    { login }
)(App);
