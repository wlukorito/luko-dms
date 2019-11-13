import React, { useState } from 'react';
import axios from 'axios';
import Message from '../utils/Message';
import { baseURL } from '../serverURL';

const CreateUserForm = () => {
    //states
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [clientName, setClientName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [industry, setIndustry] = useState('');
    const [taxObligation, setTaxObligation] = useState([]);
    const [taxStatus, setTaxStatus] = useState('');
    const [fees, setFees] = useState('');
    const [statement, setStatement] = useState('');
    const [comments, setComments] = useState('');

    //onChange handlers
    const onFullnameChange = e => {
        setClientName(e.target.value);
    };

    const onUsernameChange = e => {
        setUsername(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onPhoneChange = e => {
        setPhone(e.target.value);
    };

    const onAddressChange = e => {
        setAddress(e.target.value);
    };

    const onIndustryChange = e => {
        setIndustry(e.target.value);
    };
    //handle multiple select
    const onTaxObligationChange = e => {
        const value = e.target.value;
        if (value) {
            //option not in array, add to values
            if (!taxObligation.includes(value)) {
                setTaxObligation([...taxObligation, value]);
            } else {
                //remove selected option
                const newState = [...taxObligation].filter(val => val !== value);
                setTaxObligation([...newState]);
            }
        }
    };

    const onTaxStatusChange = e => {
        setTaxStatus(e.target.value);
    };

    const onFeesChange = e => {
        setFees(e.target.value);
    };

    const onStatementChange = e => {
        setStatement(e.target.value);
    };

    const onCommentsChange = e => {
        setComments(e.target.value);
    };

    const validateForm = () => {
        //check for mandatory fields
        if (!clientName || !username || !password || !industry || !taxObligation || !taxStatus) {
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setClientName('');
        setUsername('');
        setPassword('');
        setEmail('');
        setPhone('');
        setAddress('');
        setIndustry('');
        setTaxObligation([]);
        setTaxStatus('');
        setFees('');
        setStatement('');
        setComments('');
    };

    const onFileSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
            //create data object
            const data = {
                clientName,
                username,
                password,
                email,
                phone,
                address,
                industry,
                taxObligation,
                taxStatus,
                fees,
                statement,
                comments
            };

            try {
                console.log('Uploading');
                const response = await axios.post(`${baseURL}/users`, data);
                console.log(response.status);
                setMessage({ msg: 'File uploaded successfully', type: 'success' });
                //reset form
                resetForm();
            } catch (e) {
                setMessage({ msg: 'There was a problem with the server', type: 'danger' });
                console.log(e.message);
            }
        } else {
            setMessage({ msg: 'All fields marked * must be filled', type: 'danger' });
        }

        // remove status message after 3 seconds
        setTimeout(() => {
            setMessage({ msg: '', type: '' });
        }, 8000);
    };

    return (
        <>
            <h6 className="text-center text-uppercase">Create New Client</h6>
            <div className="card m-3 p-3">
                {/* Conditionally render feedback message */}
                {message.msg ? <Message feedback={message} /> : null}
                <form onSubmit={onFileSubmit} className="mt-4">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="fullname">
                                Client Full Name <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullname"
                                value={clientName}
                                onChange={onFullnameChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="username">
                                Username <sup>*</sup>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={onUsernameChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={onPasswordChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={onEmailChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={onPhoneChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="address">Address Line</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={address}
                                onChange={onAddressChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="industry">Industry/Occupation</label>
                            <input
                                type="text"
                                className="form-control"
                                id="industry"
                                value={industry}
                                onChange={onIndustryChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="statement">Statement</label>
                            <input
                                type="text"
                                className="form-control"
                                id="statement"
                                value={statement}
                                onChange={onStatementChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="fees">Fees Charged</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fees"
                                value={fees}
                                onChange={onFeesChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="tax_status">Tax Status</label>
                            <select
                                className="custom-select"
                                id="tax_status"
                                onChange={onTaxStatusChange}
                                value={taxStatus}>
                                <option value="">Select Status</option>
                                <option value="compliant">Compliant</option>
                                <option value="non-compliant">Non-Compliant</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="tax_obligation">Tax Obligation</label>
                            <select
                                className="custom-select"
                                id="tax_obligation"
                                onChange={onTaxObligationChange}
                                value={taxObligation}
                                multiple>
                                <option value="">Select Obligation</option>
                                <option value="payee">PAYEE</option>
                                <option value="vat">VAT</option>
                                <option value="rental">Rental</option>
                                <option value="annual tax">Annual Tax</option>
                                <option value="instalment">Instalment</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="comment">Comments</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                id="comment"
                                value={comments}
                                onChange={onCommentsChange}
                            />
                        </div>
                    </div>
                    <button className="btn btn-info btn-block my-4" type="submit">
                        Upload
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateUserForm;
