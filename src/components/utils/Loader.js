import React from 'react';
import './Loaders.css';

/*
possible classnames for loaders
[lds-hourglass, lds-ripple, lds-dual-ring, lds-spinner, lds-circle]
*/
const Loader = ({ lds }) => {
    switch (lds) {
        case 'lds-ripple':
            return (
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            );
        case 'lds-spinner':
            return (
                <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        case 'lds-circle':
            return (
                <div class="lds-circle">
                    <div></div>
                </div>
            );
        default:
            return <div className={lds}></div>;
    }
};

export default Loader;
