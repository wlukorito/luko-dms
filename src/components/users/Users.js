import React from 'react';
// import { Route, Link } from 'react-router-dom';
import CreateUserForm from './CreateUserForm';

const Users = ({ match }) => {
    return (
        <div className="p-2">
            {/* <Link to={`${match.url}/users`} className="px-2">
                Users
            </Link>

            <Link to={`${match.url}/profiles`} className="px-2">
                Profiles
            </Link>

            <Link to={`${match.url}/`} className="px-2">
                Tokyo
            </Link>

            <Route
                path={`${match.path}/:slug`}
                render={props => (
                    <>
                        Hello Mr Luko <br />
                        <h3>Welcome to {props.match.params.slug}</h3>
                    </>
                )}
            /> */}
            <CreateUserForm />
        </div>
    );
};

export default Users;
