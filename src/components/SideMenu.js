import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MenuItem from './MenuItem';

const SideMenu = ({ isToggled, menu }) => {
    const [activeItem, setActiveItem] = useState('Profile');
    return (
        <nav id="sidebar" className={isToggled ? 'active' : ''}>
            <div className="sidebar-header">
                <Link to="/">
                    <img className="img-fluid" src="./img/sketch-brands.svg" alt="logo" width="30px" height="30px" />
                    <span className="lead">CWK DMS</span>
                </Link>
            </div>

            <ul className="list-unstyled components">
                <p className="dash">Dashboard</p>
                {menu.map(item => {
                    return <MenuItem item={item} key={item} active={{ activeItem, setActiveItem }} />;
                })}
            </ul>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        menu: state.auth.userData.menu
    };
};

export default connect(mapStateToProps)(SideMenu);
