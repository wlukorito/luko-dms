import React, { useState } from 'react';
import axios from 'axios';
import Message from '../utils/Message';
import ProgressBar from '../utils/ProgressBar';
import { baseURL } from '../serverURL';

const FileUploadForm = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('Choose file');
    const [message, setMessage] = useState({ msg: '', type: '' });
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [docTitle, setDocTitle] = useState('');
    const [docType, setDocType] = useState(0);
    const [owner, setOwner] = useState(''); //get this from back-end based on user and role
    const [period, setPeriod] = useState('');
    const [comments, setComments] = useState('');

    const onTitleChange = e => {
        setDocTitle(e.target.value);
    };

    const onTypeChange = e => {
        setDocType(e.target.value);
    };

    const onOwnerChange = e => {
        setOwner(e.target.value);
    };

    const onPeriodChange = e => {
        setPeriod(e.target.value);
    };

    const onCommentsChange = e => {
        setComments(e.target.value);
    };

    const onFileChange = e => {
        try {
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
        } catch (e) {
            console.log(e.message);
            setFilename('Choose a file');
            setMessage({ msg: 'You must select a file', type: 'warning' });
        }
    };

    const validateForm = () => {
        if (!docTitle || !docType || !owner || !period) {
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setDocTitle('');
        setDocType(0);
        setOwner('');
        setPeriod('');
        setComments('');
        setFile(null);
        setFilename('Choose file');
    };

    const onFileSubmit = async e => {
        e.preventDefault();
        //do not submit if no file selected
        if (file) {
            if (validateForm()) {
                const formData = new FormData();
                formData.append('title', docTitle);
                formData.append('type', docType);
                formData.append('owner', owner);
                formData.append('period', period);
                formData.append('comments', comments);
                formData.append('file', file);
                try {
                    console.log('Uploading');
                    // const response =
                    await axios.post(`${baseURL}/upload`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: progressEvent => {
                            setUploadPercentage(
                                parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10)
                            );
                            //clear percentage
                            setTimeout(() => setUploadPercentage(0), 3000);
                        }
                    });

                    setMessage({ msg: 'File uploaded successfully', type: 'success' });
                    //reset form
                    resetForm();
                } catch (e) {
                    setMessage({ msg: 'There was a problem with the server', type: 'danger' });
                    console.log(e.message);
                }
            } else {
                setMessage({ msg: 'You must fill all mandatory fields', type: 'warning' });
            }
        } else {
            setMessage({ msg: 'You must select a file', type: 'danger' });
        }
        // remove status message after 3 seconds
        setTimeout(() => {
            setMessage({ msg: '', type: '' });
        }, 8000);
    };

    return (
        <>
            <h6 className="text-center text-uppercase">New Document Upload</h6>
            <div className="card m-3 p-3">
                {/* Conditionally render feedback message */}
                {message.msg ? <Message feedback={message} /> : null}
                <form onSubmit={onFileSubmit} className="mt-4">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="doc_title">Document Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="doc_title"
                                value={docTitle}
                                onChange={onTitleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="doc_type">Document Type</label>
                            <select className="custom-select" id="doc_type" value={docType} onChange={onTypeChange}>
                                <option value="">Select Document Type</option>
                                <option value="1">Core Docs</option>
                                <option value="2">Other Docs</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="owner">Owner</label>
                            <select className="custom-select" id="owner" onChange={onOwnerChange} value={owner}>
                                <option value="">Select Document Owner</option>
                                <option value="1">Admin</option>
                                <option value="2">Client</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="period">Period</label>
                            <select className="custom-select" id="period" onChange={onPeriodChange} value={period}>
                                <option value="">Select Period</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comments</label>
                        <textarea
                            className="form-control"
                            rows="2"
                            id="comment"
                            value={comments}
                            onChange={onCommentsChange}
                        />
                    </div>

                    <div className="file-upload-wrapper text-center py-3 border">
                        <input
                            type="file"
                            id="input-file-now"
                            className="file-upload form-control"
                            onChange={onFileChange}
                        />
                        <label className="customm-file-label" for="input-file-now">
                            <i className="fas fa-cloud-upload-alt fa-3x" id="upIcon"></i>
                            <p className="text-muted">Drag and drop a file or click to browse</p>
                            <hr />
                            <p>
                                <span>{filename}</span>
                            </p>
                        </label>
                    </div>

                    <ProgressBar percentage={uploadPercentage} />

                    <button className="btn btn-info btn-block my-4" type="submit">
                        Upload
                    </button>
                </form>
            </div>
        </>
    );
};

export default FileUploadForm;
