import React from 'react';

//Ey! checkout the advanced destructuring here
const Message = ({ feedback: { msg, type } }) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {msg}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Message;
