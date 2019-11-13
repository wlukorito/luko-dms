import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideMenu from './SideMenu';
import Navbar from './Navbar';
import Users from './Users';
import Uploads from './uploads/Uploads';
import Settings from './Settings';
import Documentation from './Documentation';

const Dashboard = ({ isToggled, setIsToggled, setIsAuth, match }) => {
    console.log(match);
    return (
        <div className="wraper ">
            <SideMenu isToggled={isToggled} />
            <div id="content" className={isToggled ? 'active' : ''}>
                <Navbar setIsAuth={setIsAuth} setIsToggled={setIsToggled} isToggled={isToggled} />
                {/* <Switch> */}
                <Route exact path={`${match.path}/:users`} component={Users} />
                <Route path="/uploads" component={Uploads} />
                <Route path="/settings" component={Settings} />
                <Route path="/documentation" component={Documentation} />
                <Route path="/:any" render={() => <h6>NOT FOUND</h6>} />
                {/* </Switch> */}
            </div>
        </div>
    );
};

export default Dashboard;
