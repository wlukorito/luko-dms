import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions';
import { connect } from 'react-redux';

const Navbar = ({ logout, setIsToggled, isToggled }) => {
    // const {setIsToggled, isToggled} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light px-1 py-1">
            <div className="container-fluid">
                <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => setIsToggled(!isToggled)}>
                    <i className="fas fa-bars"></i>
                </button>
                <button
                    className="btn btn-sm btn-dark d-inline-block d-lg-none ml-auto px-3"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-sort-down"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings" title="Settings">
                                <i className="fas fa-cog"></i>
                                {/* Settings */}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/documentation" title="Help">
                                <i className="fas fa-question-circle"></i>
                                {/* Help */}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                                title="Logout"
                                onClick={() => {
                                    logout();
                                }}>
                                <i className="fas fa-power-off"></i>
                                {/* Logout */}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default connect(
    null,
    { logout }
)(Navbar);
