import React from 'react';
import { Link } from 'react-router-dom';

const resolveMenu = name => {
    switch (name.toLowerCase()) {
        case 'users':
            return { iconClass: 'fas fa-user-alt', displayName: 'Users' };
        case 'profile':
            return { iconClass: 'fas fa-address-card', displayName: 'My Profile' };
        case 'upload':
            return { iconClass: 'fas fa-upload', displayName: 'New Upload' };
        case 'uploads':
            return { iconClass: 'fas fa-folder-open', displayName: 'Uploaded Files' };
        case 'finished':
            return { iconClass: 'fas fa-th-list', displayName: 'Finished Files' };
        case 'stats':
            return { iconClass: 'fas fa-chart-pie', displayName: 'Stats' };
        default:
            return { iconClass: 'fas fa-home', displayName: 'Menu Item' };
    }
};

const MenuItem = ({ item, active }) => {
    const activeClass = active.activeItem === item ? 'active' : '';
    const { iconClass, displayName } = resolveMenu(item);
    return (
        <li className={activeClass} onClick={() => active.setActiveItem(item)}>
            <Link to={`/${item.toLowerCase()}`}>
                <i className={iconClass}></i>&emsp;
                {displayName}
            </Link>
        </li>
    );
};
export default MenuItem;
